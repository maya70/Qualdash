<<<<<<< HEAD
=======
# read raw admission data from its current location
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1
 library(readr)
 library(lubridate)
 library(parsedate)

<<<<<<< HEAD
 source_file_path <- "C:/Bitnami/wampstack-7.1.29-0/apache2/htdocs/qualdash/home/data/"
 dest_file_path <- "C:/Bitnami/wampstack-7.1.29-0/apache2/htdocs/qualdash/home/data/minap_admission/"
 dateFormat <- '%d/%m/%Y %H:%M'
 audit_filename <- "Ami-1-4-16 - 31-3-19.csv"
=======
 source_file_path <- "P:/Cardiology/Research/MINAP/Qualdash Test/"
 dest_file_path <- "\\/VMRS-QUALDAS01/qualdash/home/data/minap_admission/"
#dest_file_path <- "P:/Cardiology/Research/MINAP/Qualdash Test/minap_admission/"
# source_file_path <-"z:/Qualdash/"
 #dest_file_path <- "z:/Qualdash/minap_admission/"
 
 #dateFormat <- "%d-%m-%y %H:%M"
 #dateFormat <- "%Y-%m-%d %H:%M:%S"
 dateFormat <- "%d-%B-%y"
 audit_filename <- "MINAP_QD_upload.csv"
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1
 
 source = paste(source_file_path, audit_filename, sep='')
 madmission <- read_csv(source)

 # get years in data
<<<<<<< HEAD
 admdate <- as.Date(madmission$`3.06 Date/time arrival at hospital`, format=dateFormat)
=======
 admdate <- as.Date(madmission$`Arrival at hospital`, format=dateFormat)
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1
 adyear <- year(admdate)
 madmission <- cbind(madmission, adyear)

# Select all columns with Date data type
<<<<<<< HEAD

allDates <- lapply(madmission, function(x) !all(is.na(as.Date(as.character(x), format =dateFormat))))
df <- as.data.frame(allDates)
colnames(df) <- colnames(madmission)
dateFields <- df[which(df==TRUE)]
=======
 allDates <- lapply(madmission, function(x) !all(is.na(as.Date(as.character(x), format = dateFormat))))
 df <- as.data.frame(allDates)
 colnames(df) <- colnames(madmission)
 dateFields <- df[which(df==TRUE)]
 
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1

# Unify date formats to ISO format 
for(col in colnames(madmission)){
    if(col %in% colnames(dateFields)){
<<<<<<< HEAD
     vector <- madmission[col]
     temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
     madmission[col] <- temp
=======
    	vector <- madmission[col]
    	temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
    	madmission[col] <- temp
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1

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
<<<<<<< HEAD
     vector <- madmission[col]
     temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
     madmission[col] <- temp
=======
    	vector <- madmission[col]
    	temp <- lapply(vector, function(x) as.POSIXlt(x, format=dateFormat))
    	madmission[col] <- temp
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1

    }
}


# Derived columns
<<<<<<< HEAD
v427 <- madmission$`4.27 Discharged on a thienopyridine inhibitor` == '1. Yes'
v431 <- madmission$`4.31 Discharged on TIcagrelor (v10.3 Dataset)` == '1. Yes'

madmission$P2Y12 <- as.numeric(v431 | v427)

dtb <- madmission$`3.09 Date/time of reperfusion treatment` - madmission$`3.06 Date/time arrival at hospital`
madmission$dtb <- as.numeric(dtb)

dta <- madmission$`4.18 Local angio date` - madmission$`3.06 Date/time arrival at hospital`
=======
v427 <- madmission$`Thienopyridine_inhibitor_disch` == '1. Yes'
v431 <- madmission$`Discharged on Ticagrelor` == '1. Yes'
madmission$P2Y12 <- as.numeric(v431 | v427)

arr <- as.Date(madmission$`Arrival at hospital`,  format="%d-%B-%y")
rep <- as.Date(madmission$`Reperfusion treatment`)  
dtb <- rep - arr
madmission$dtb <- as.numeric(dtb)

angio <- as.Date(madmission$`Date angio performed`, format="%d-%B-%y")
dta <- angio - arr
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1
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
<<<<<<< HEAD
 write.csv(unique(adyear), yfn, row.names = FALSE)
=======
 av <- read_csv(yfn)
 temp <- av$x
 for(year in unique(madmission$adyear)){
   if(!(year %in% av$x))
     temp <- c(av$x, year)
 }
 write.csv(temp, yfn, row.names = FALSE)
>>>>>>> 3d656f5772f9c13a9e70ba1182f3305d98c492d1
