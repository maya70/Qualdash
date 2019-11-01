# read raw admission data from its current location
 library(readr)
 library(lubridate)
 library(parsedate)

 source_file_path <- "P:/Cardiology/Research/MINAP/Qualdash Test/"
 dest_file_path <- "\\/VMRS-QUALDAS01/qualdash/home/data/minap_admission/"
#dest_file_path <- "P:/Cardiology/Research/MINAP/Qualdash Test/minap_admission/"
# source_file_path <-"z:/Qualdash/"
 #dest_file_path <- "z:/Qualdash/minap_admission/"
 
 #dateFormat <- "%d-%m-%y %H:%M"
 #dateFormat <- "%Y-%m-%d %H:%M:%S"
 dateFormat <- "%d-%B-%y"
 audit_filename <- "MINAP_QD_upload.csv"
 
 source = paste(source_file_path, audit_filename, sep='')
 madmission <- read_csv(source)

 # get years in data
 admdate <- as.Date(madmission$`Arrival at hospital`, format=dateFormat)
 adyear <- year(admdate)
 madmission <- cbind(madmission, adyear)

# Select all columns with Date data type
 allDates <- lapply(madmission, function(x) !all(is.na(as.Date(as.character(x), format = dateFormat))))
 df <- as.data.frame(allDates)
 colnames(df) <- colnames(madmission)
 dateFields <- df[which(df==TRUE)]
 

# Unify date formats to ISO format 
for(col in colnames(madmission)){
    if(col %in% colnames(dateFields)){
    	vector <- madmission[col]
    	temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
    	madmission[col] <- temp

    }
}


# Add other formats 
dateFormat <- "%d/%m/%Y"
otherDates <- lapply(madmission, function(x) !all(is.na(as.Date(as.character(x), format = dateFormat))))
df2 <- as.data.frame(otherDates)
colnames(df2) <- colnames(madmission)
dateFields2 <- df2[which(df2==TRUE)]

# Unify date formats to ISO format 
for(col in colnames(madmission)){
    if(col %in% colnames(dateFields2)){
    	vector <- madmission[col]
    	temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
    	madmission[col] <- temp

    }
}


# Derived columns
v427 <- madmission$`Thienopyridine_inhibitor_disch` == '1. Yes'
v431 <- madmission$`Discharged on Ticagrelor` == '1. Yes'
madmission$P2Y12 <- as.numeric(v431 | v427)

arr <- as.Date(madmission$`Arrival at hospital`,  format="%d-%B-%y")
rep <- as.Date(madmission$`Reperfusion treatment`)  
dtb <- rep - arr
madmission$dtb <- as.numeric(dtb)

angio <- as.Date(madmission$`Date angio performed`, format="%d-%B-%y")
dta <- angio - arr
madmission$dta <- as.numeric(dta)
dtaH <- as.numeric(dta) / 60
madmission$dtaTarget <- as.numeric(dtaH < 72.0)
madmission$dtaNoTarget <- as.numeric(dtaH > 72.0)



 # break it into separate files for individual years
 # and store the new files in the MINAP admissions folder under documnt root 
 for(year in unique(adyear)){
     tmp = subset(madmission, adyear == year)
     fn = paste(dest_file_path, gsub(' ','', year), '.csv', sep='' )
     write.csv(tmp, fn, row.names = FALSE)
 }

 yfn = paste(dest_file_path, 'avail_years.csv', sep='' )
 av <- read_csv(yfn)
 temp <- av$x
 for(year in unique(madmission$adyear)){
   if(!(year %in% av$x))
     temp <- c(av$x, year)
 }
 write.csv(temp, yfn, row.names = FALSE)
