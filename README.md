# Qualdash
This branch contains site-specific configuration for Blackburn

## Metric cards for MINAP: 

### Card 1: Mortality 

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
  

### Card 5: Referral for cardiac rehabilitation
* Main view: number or patients admitted in a month and proportions of whom who were:
  * referred for cardiac rehabilitation 
  * not referred for cardiac rehabilitation
  * not indicated for cardiac rehabilitation
  * patients who declined cardiac rehabilitation
   
* Main task: How many admissions in a month fall in each of the categories described above?

* Pie subview: gender, justified delay ``` candidate for change ```
  * Possible tasks: 
    * Were the majority of patients referred for cardiac rehabilitation in a month male or female? 
    
* Bars subview: door-to-angiogram target met, door-to-angiogram (average) ```candidates for change ```
* History subview: (same variables in main view with a historical context)
  

### Card 6: Accute use of aspirin
* Main view: number or patients admitted in a month and proportions of whom who were:
  * already on aspiring when they were admitted
  * given aspirin/antiplatelet drug out of hospital
  * given aspirin/antiplatelet drug after arrival at hospital
  * contraindicated to be given given aspirin/antiplatelet drug
  * not given aspirin/antiplatelet drug

* Main task: How many admissions in a month fall in each of the categories described above?

* Pie subview: each of the individual categories is shown in a tab  ```candidate for change```    
   
* Bars subview: door-to-angiogram target met, door-to-angiogram (average) ```candidates for change ```
* History subview: (same variables in main view with a historical context)
   

