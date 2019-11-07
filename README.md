# Qualdash
This branch contains site-specific configuration for Stoke


## Metric cards for PICANet: 



### Card 1: Mortality by admission month
* Main view: Admission count and death count by month of admission
* Main task: How many admissions in a month are alive and how many of them eventually died in hospital? 

* Pie subview: primary reason for admission, admission type, ethnicity
  * Possible tasks: 
    * What was the primary reason for admission for deceased patients?
    * What was the admission type for admitted patients in a month?
    * Was death more common for a specific ethnic group in a time period?

* Bars subview: PIM3 (sum)
  * Possible tasks: 
     * Did a month with high mortality have a higher total PIM3 score (which indicates severity of illness) in the admitted patient cohort? 
* History subview: (same variables in main view with a historical context)
  * Possible tasks:
    * Was the mortality in February this year higher than the same time in previous years?


### Card 2: 48-hour readmission 

* Main view: Discharge count and 48-hour readmission event count organised by month of discharge
* Main task: How many patients were discharged in a month and how many were readmitted within 48 hours? 

* Pie subview: source of admission, care area admitted from, destination following discharge from unit
  * Possible tasks: 
    * What was the source of admission for patients with 48-hour readmission?
    * Which care area where patients with 48-hour discharge admitted from?
    * What was the most common destination following discharge from unit for discharged patients in a month? 

* Bars subview: unplanned admissions
  * Possible tasks:
    * What was the total number of unplanned admissions in a month with high rates of 48-hour readmission? 

* History subview: (same variables in the main view with historical context)


### Card 3: Bed days and ventilation

* Main view: Number of bed days and number of invasive ventilation days in each month
* Main task: What was the total number of bed days and the number of invasive ventilation days in a month?

* Pie subview: Invasive ventilation (this needs to change)

* Bars subview: PIM3 (this needs to change)

* History subview: (same as main view with historical context)


### Card 4: Dependency

* Main view: Number of admissions at each level of dependency organised by months of admission
* Main task: How many patients were at level of dependency X in month Y? 
* Pie subview: Primary reason of admission, admission type, gender, ethnicity
  * Possible tasks:
    * What was the primary reason of admission for patients at the enhanced care dependency level?
    * What was the type of admission for patients at the intensive care advanced dependency?
    * Are the majority of patients in intensive care male or female? 
  
* Bars subview: separate bar charts for individual dependency levels (2 examples given for the first two levels of dependency to show that each category can be displayed separately). 

* History subview: (same as main view with a historical context). 


### Card 5: Data Quality
 This card is under re-construction



## Metric cards for MINAP: 

### Card 1: Mortality by month of admission 

* Main view: Admission count and death count by month of admission
* Main task: How many admissions in a month are alive and how many of them were eventually deceased? 

* Pie subview: admission diagnosis, method of admission
  * Possible tasks: 
    * What was the primary diagnosis at admission for deceased patients?
    * What was the most common admission method in a month?
    * Was death more common for patients coming with a specific method of admission? 

* Bars subview: bed days (sum)
  * Possible tasks: 
     * Did a month with high mortality have a higher total bed occupancy in the unit?
     
* History subview: (same variables in main view with a historical context)
  * Possible tasks:
    * Was the mortality in February this year higher than the same time in previous years?



### Card 2: Call-to-balloon (STEMI only)

* Main view: Total number of patients admitted with definite myocardial infarction broken into two groups: with and without justified delays. 
* Main task: How many STEMI patients met the target call-to-balloon time in a month (no delays) and how many did not meet the target in a month (different justified delays)? 

* Pie subview: justified delay, method of admission 
  * Possible tasks: 
    * For patients that did not meet the CTB target, what was the justification for delay?
    * For patients that did not meet the CTB target, what was the method of admission?

* Bars subview: door-to-balloon (average)
  * Possible tasks: 
     * On a month with a high number of delayed patients, what was the average door-to-balloon time? 
* History subview: (same variables in main view with a historical context)
  * Possible tasks:
    * Was the number of delays in February this year higher than the same time in previous years?
    

### Card 3: Door-to-angio (NSTEMI only)

* Main view: Number of patients with no definite myocardial infarction broken into a group who experienced delays in door-to-angiogram time and a group who did not experience such delays
* Main task: How many NSTEMI patients were admitted in a month? what proportion of these patients met/ did not meet the target door-to-angiogram time of 72 hours?

* Pie subview: Method of admission, gender, justified delay
  * Possible tasks: 
    * Were the majority of delayed patients male or female?
    * What was the admission method for delayed patients in a month?
    * For patients who expereinced delays, what was the justification for delay?

* Bars subview: door-to-angio (average)
  * Possible tasks: 
     * For a month with a high proportion of delayed patients, what was the average door-to-angiogram time?
     
* History subview: (same variables in main view with a historical context)


### Card 4: Gold standard drugs

* Main view: number or patients admitted in a month and proportions of whom who were given all five gold standard drugs versus the proportion of whom who were not given all five drugs. 
 * The drugs used in this classification are:
   * Angiotensin II Blocker
   * Beta blocker
   * Statin
   * Aspirin or other anti-platelet drug
   * Thienopyridine inhibitor or Ticagrelor
   
* Main task: How many admissions in a month were eventually discharged with all five gold standard drugs? How many were not given all five drugs?

* Pie subview: each of the individual drugs is shown in a tab
  * Possible tasks: 
    * For a month with high proportion of patients not given gold standard drugs at discharge, which drug was not given?
    
* Bars subview: door-to-balloon (average) ```candidate for change ```
* History subview: (same variables in main view with a historical context)
  

### Card 5: 

Main view: 
Pie subview: 
Bars subview: 
History subview: 


### Card 6: 

Main view: 
Pie subview: 
Bars subview: 
History subview: 

