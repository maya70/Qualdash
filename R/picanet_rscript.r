library(readr)

library(lubridate)

library(parsedate)



source_file_path <-"//iqdvmappp01its/qualdash/home/data/source/"

dest_file_path <- "//iqdvmappp01its/qualdash/home/data/picanet_admission/"

dest_activity_path <- "//iqdvmappp01its/qualdash/home/data/picanet_activity/"

audit_filename <- "admission.csv"

#dateFormat <- "%d-%m-%y %H:%M"

dateFormat <- "%d/%m/%Y %H:%M:%S"


source = paste(source_file_path, audit_filename, sep='')

# read raw admission data from its current location

admission <- read_csv(source)



# get years in data

admdate <- as.Date(paste(admission$AdDate), dateFormat)

adyear <- year(admdate)

admission <- cbind(admission, adyear, invVentEncounter =0)



allDates <- lapply(admission, function(x) !all(is.na(as.Date(as.character(x), format =dateFormat))))
df <- as.data.frame(allDates)
colnames(df) <- colnames(admission)
dateFields <- df[which(df==TRUE)]



# Unify date formats to ISO format

for(col in colnames(admission)){
 
  if(col %in% colnames(dateFields)){
   
    vector <- admission[col]
   
    temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
   
    admission[col] <- temp
  }
}

# break it into seperate files for individual years
  # and store the new files in the picanet folder
for(year in unique(admission$adyear)){
  tmp = subset(admission, adyear == year)    
  fn = paste(dest_file_path, gsub(' ','', year), '.csv', sep='' )
  write.csv(tmp, fn, row.names = FALSE)
}


########
yfn = paste(dest_file_path ,'avail_years.csv', sep='' )
# read in values already in avail_years
av <- read_csv(yfn)
temp <- av$x
for(year in unique(admission$adyear)){
  if(!(year %in% av$x))
    temp <- c(av$x, year)
}
write.csv(temp, yfn, row.names = FALSE)


# read raw activity data
source = paste(source_file_path, "activity.csv", sep='')
activity <- read_csv(source)

# split activity file by year of admission
myvars <- c("adyear", "EventID")
newdata <- admission[myvars]
df <- merge(newdata, activity, by='EventID')

# get the latest year in your data
#maxyear <- max(admission$adyear, na.rm = TRUE)


#########################################
  M <- merge(admission, activity, by=c('EventID'), all.x=T)
 
  # select only relevant columns for QualDash
  d = data.frame(M$EventID, M$ActivityDate , M$AdDate,   M$ActivityDate, M$PccHrg, M$InvVentET, M$InvVentTT)
  colnames(d) <- c('EventID', 'ActivityDate' , 'adDate', 'invVentStart', 'hrggroup', 'InvVentET', 'InvVentTT')
  ventEvt <- d$InvVentET | d$InvVentTT
  count = 0
  for(row in 1:nrow(d)){
    id <- d$EventID[row]

# record the start date of invasive ventilation for this admission
    if(ventEvt[row]){
      count <- count + 1
      # is this the first time of invVent?
      if(admission[which(admission$EventID == id), 'invVentEncounter'] == 0){
        admission[which(admission$EventID == id), 'invVentEncounter'] <- 1
        admission[which(admission$EventID == id), 'invVentStart'] <- d$ActivityDate[row]
      }
  numDays <- admission[which(admission$EventID == id), 'InvVentDay']
      admission[which(admission$EventID == id), 'invVentEnd'] <- as.Date(d$ActivityDate[row], dateFormat) + numDays
    }

}

 vector <- admission['inVentStart']
   
 temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
   
 admission['inVentStart'] <- temp

  vector <- admission['inVentEnd']
   
 temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
   
 admission['inVentEnd'] <- temp


#admission$inVentEnd <- lapply(admission$inVentEnd, function(x) as.POSIXlt(x, format=dateFormat))

###########################################



for(year in unique(df$adyear)){
  # read the admission records for the current year alone
  fn = paste(dest_file_path, gsub(' ','', year), '.csv', sep='' )
  cur_adm <- read.csv(fn)
  # merge the activity file
  M <- merge(cur_adm, activity, by=c('EventID'), all.x=T)
 
  # select only relevant columns for QualDash
  d = data.frame(M$EventID, M$ActivityDate , M$AdDate,   M$ActivityDate, M$PccHrg, M$InvVentET, M$InvVentTT)
  colnames(d) <- c('EventID', 'ActivityDate' , 'adDate', 'invVentStart', 'hrggroup', 'InvVentET', 'InvVentTT')
 
  for(level in unique(d$hrggroup)){
    admission[, toString(level) ] <- 0
  }

   for(row in 1:nrow(d)){
   id <- d$EventID[row]
    level <- d$hrggroup[row]
    lev <- toString(level[1])
    # record the number of days at dependency level lev
    admission[which(admission$EventID == id), lev] <- 1 + admission[which(admission$EventID == id), lev]
   
    }
   
 
  tmp = subset(admission, adyear == year)    
  fn = paste(dest_file_path, gsub(' ','', year), '.csv', sep='' )
  write.csv(tmp, fn, row.names = FALSE)
 
  fn = paste(dest_activity_path, 'shortactiv' , gsub(' ','', year), '.csv', sep='' )
  write.csv(d, fn)
}
