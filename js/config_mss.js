$Q.Picanet = {
  "availMetrics": [{"value": "Mortality by admission month",
                    "text": "Mortality by admission month"},
                    {"value": "48h Readmission",
                      "text": "48h Readmission"},
                    {"value": "Bed Days",
                    "text": "Bed Days"},
                    //{"value": "case_mix",
                    //"text": "Specialty Case Mix"},
                    {"value": "Dependency",
                      "text": "Dependency"
                    },
     {"value": "Ventilation Events",
                     "text": "Ventilation Events"},
                    {"value": "Data Quality",
                     "text": "Data Quality"}
                    ],
"variableDict": {"PrimReason": "Diagnosis",
                 "unplannedextubation": "Unplanned Extubation",
                 "UnitDisStatus": "Deaths",
                 "missing1": "Group 1: fields containing missing values",
                 "missing2": "Group 2: fields containing missing values",
                 "missing3": "Group 3: fields containing missing values",
                 "missing4": "Group 4: fields containing missing values",
                  "adtype": "Ad. type",
                  "sex": "Gender",
                  "EventID": "Admissions",
                  "der_death": "Deaths in unit",
                  "der_smr": "SMR",
                  "der_discharge": "Discharges",
                  "der_readmit": "Readmissions",
                  "ethnic": "Ethnic",
                  "der_bedDays": "Bed Days",
                  "der_invVentDays": "Invasive Ventil.",
                  "der_noninvVentDays": "Noninvasive Ventil.",
                  "der_missing": "Missing",
                  "der_invalid": "Invalid (coming soon)",
                  "der_extubation": "Extubation",
                  "der_depLevelEC": "Enhanced Care",
                  "der_depLevel0": "Unable to Group",
                  "der_depLevel1": "High Dep.",
                  "der_depLevel2": "High Dep. Adv.",
                  "der_depLevel3": "IC Basic",
                  "der_depLevel4": "IC Basic Enhanced",
                  "der_depLevel5": "IC Advanced",
                  "der_depLevel6": "IC Advanced Enhanced"
                },
"displayVariables": [{  "metric": "Mortality by admission month",
                        "mark": "bar",
                        "chart": "grouped",
                        "colorScale": "categorical",
                        "x": "AdDate",
                        "y": ["EventID", "UnitDisStatus"],
                        "legend": ["Alive Admissions", "Deaths in unit"],
                        "yaggregates": ["count", "count"],
                        "yfilters": {"EventID": {"where":{ "UnitDisStatus": "1" }, "valid":["1", "2"]},      
                                     "UnitDisStatus":{"where":{ "UnitDisStatus": "2" }, "valid":["1", "2"]}
                                     
                                     },                                                
                        "xType": "t",
                        "yType": ["q", "q"],  
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "Num. Records",                        
                        "tspan": 3,                          
                        "granP": ["unit", "unit"],  
                        "ehr": "Admissions",
             
                        /** Slave Tasks spec begin here **/
                        "categories": ["PrimReason","AdType", "Ethnic"],      
                        "quantities": [{"q":"PIM3","granT": "AdDate", "granP":["unit"], "yaggregates": "sum" }], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": ["EventID", "UnitDisStatus"] }   // the first element holds the master view's granT                                            
         
                     },
                     {  "metric": "48h Readmission",
                        "mark": "bar",
                        "x": "UnitDisDate",
                        "y": ["UnitDisStatus", "der_readmit"],
                        "categories": ["SourceAd", "CareAreaAd", "UnitDisDest"],
                        "quantities": [{"q":"der_readmit", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" },
                                      {"q":"AdType", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum", "filters": {"where": { "AdType": ["2", "4"] } } }],
                        "xType": "t",
                        "yType": ["q", "q"],
                        "legend": ["Discharged", "Readmitted"],
                        "yfilters": {"UnitDisStatus": {"where": {"UnitDisStatus": "1"} },
                                      "der_readmit": {"where":"*"}} ,
                        "xspan": "year",    
                        "yspan": "unit",
                        "ylabel": "Num. Records",
                        "tspan": 3,
                        "yaggregates": ["count", "count"],
                        "ehr": "Admissions",
                        "granP": ["unit", "unit"],
                        "granT": {"monthly-annual": ["UnitDisStatus", "der_readmit"]}
                       
                     },
                      {  "metric": "Bed Days",
                        "mark": "bar",
                        "x": "AdDate",
                        "y":["der_bedDays", "InvVentDay"],
                        "yfilters": {"der_bedDays" : {"where":"*"},
                                    "InvVentDay": {"where":"*"}},
                        "xType": "t",
                        "yType": ["q", "q"],
                        "xspan": "year",    
                        "yspan": "unit",
                        "ylabel": "Num. Days",
                        "tspan": 3,                        
                        "yaggregates": ["sum", "sum", "sum"],
                        "ehr": "Admissions",
                        "granP": ["unit", "unit", "unit"],
                        "categories": ["InvVentDescription"],
                        "quantities": [{"q":"PIM3", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" },
                                        {"q":"der_bedDays", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" }],                      
                        "granT": {"monthly-annual": ["der_bedDays", "InvVentDay"]},
                        "combinations": ["adtype&der_readmit"]
                     },
                      {  "metric": "dependency",                        
                        "mark": "bar",                        
                        "chart": "stacked",
                        "x": "AdDate",
                        "y": ["XB09Z", "XB07Z" ,"XB06Z", "XB05Z", "XB04Z", "XB03Z", "XB02Z", "XB01Z"],
                        "yfilters": {"XB09Z" : {"where":"*"}, "XB07Z": {"where":"*"} ,"XB06Z": {"where":"*"},
                                      "XB05Z": {"where":"*"},
                                    "XB04Z": {"where":"*"}, "XB03Z": {"where":"*"}, "XB02Z": {"where":"*"}, "XB01Z": {"where":"*"} } ,
                        "yaggregates": ["sum", "sum", "sum", "sum", "sum", "sum", "sum", "sum" ],
                        "legend": ["Enhanced Care", "High Dependency" ,"High Dependency Advanced", "Intensive Care Basic", "Intensive Care Basic Enhanced", "Intensive Care Advanced", "Intensive Care Advanced Enhanced", "Intensive Care ECMO/ECLS"],
                        "xType": "t",
                        "yType": "o",  
                        "xspan": "year",    
                        "yspan": "unit",
                        "ylabel": "Activity",
                        "tspan": 3,                          
                        "granP": ["unit"],
                        "ehr": "Admissions",                        
                        "categories": ["PrimReason","AdType", "Sex", "Ethnic"],      
                        "quantities": [ {"q":"XB09Z", "granT": "admonth", "granP":["unit"], "yaggregates": "sum" },
                                        {"q":"XB07Z", "granT": "admonth", "granP":["unit"], "yaggregates": "sum" },
                                        {"q":"PIM3", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" }
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": ["XB09Z", "XB07Z"]}   // the first element holds the master view's granT                                            
         
                     },
  {  "metric": "Ventilation Events",                        
                         "mark": "bar",
                        "chart": "stacked",
                        "colorScale": "categorical",
                        "x": "AdDate",
                        "y": [ "NonInvVent", "InvVent"],
                        "legend": ["Noninvasive ventilation", "Invasive ventilation"],
                        "yaggregates": ["count", "count"],
                        "yfilters": {"NonInvVent": {"where":{ "NonInvVent": "1" }, "valid":["1", "2"]},      
                                     "InvVent":{"where":{ "InvVent": "1" }, "valid":["1", "2"]}
                                     
                                     },                                                
                        "xType": "t",
                        "yType": ["q", "q"],  
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "Num. Records",                        
                        "tspan": 3,                          
                        "granP": ["unit", "unit"],  
                        "ehr": "Admissions",
             
                        /** Slave Tasks spec begin here **/
                        "categories": ["PrimReason","AgeGroupDays", "AgeGroupYears"],      
                        "quantities": [{"q":"PIM3","granT": "AdDate", "granP":["unit"], "yaggregates": "sum" }], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": ["NonInvVent", "InvVent"] }   // the first element holds the master view's granT                                                  
         
                     },
                      {
                      "metric": "Data Quality",
                      "mark": "bar", // should remove this
                        "x": "AdDate",
                        "y": ["der_missing", "der_invalid"],
                        "yfilters": {"der_missing" : "*",
                                    "der_invalid": "*"},
                        "yaggregates": ["sum", "sum"],
                        "legend": ["Missing values", ""],
                        "xType": "t",
                        "yType": ["q", "q"],  
                        "xspan": "year",    
                        "yspan": "unit",
                        "ylabel": "Num. Values",                        
                        "tspan": 3,                          
                        "granP": ["unit", "unit"],
                        "ehr": "Admissions",
                        /** Slave Tasks spec begin here **/
                        "categories": ["missing1","missing2", "missing3", "missing4"],      
                        "quantities": [
                                        {"q":"UnitDisStatus",  "granP":["unit"], "yaggregates": "sum",
                                         "filters": {"where": { "UnitDisStatus":"2" } } },
                                        {"q":"EventID",  "granP":["unit"], "yaggregates": "count" }
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": ["der_missing"]}   // the first element holds the master view's granT                                            
         
                     }
                       
                   
                     
                     ]

};

$Q.Minap = {
    "availMetrics": [{"value": "Mortality by admission month",
                        "text": "Mortality by admission month"},
                        //{"value": "derived_readmission",
                         // "text": "48h Readmission"},
                        {"value": "Delay from Call for Help to Reperfusion Treatment",
                        "text": "Call-to-Balloon (STEMI Only)"},
                        {"value": "Delay from admission at hospital to Angiogram",
                        "text": "Door-to-Angio (NSTEMI Only)"},
                        //{"value": "der_reqEcho",
                        //"text": "Capacity for Echo"},
                        {"value": "Gold Standard Drugs",//"Bleeding complications", // TODO: check how to calcul. complication rates
                          "text": "Gold Standard Drugs"//"Complications"
                        },
                        {"value": "Referral for Cardiac Rehabiliation",
                         "text": "Referral for Cardiac Rehabiliation"},
                         {"value": "Acute use of Aspirin",
                         "text": "Acute use of Aspirin"}],
    "variableDict": {"1.02 Patient case record number": "Admissions",
                      "der_discharge": "Discharges",
                      "der_readmit": "Readmissions",
                      "der_stemi": "PCI patients",
                      "der_nstemi": "NSTEMI admissions",
                      "der_ctbTarget": "CTB Not meeting target",
                      "der_angioTarget": "DTA meeting target",
                      "der_ctbTargetMet": "Met target",
                      "der_ctb": "Avgerage CTB",
                      "der_bedDays": "Bed Days",
                      "dtb": "Door-to-Balloon",
                      "dta": "Door-to-Angio"
                      },
    "displayVariables": [
                         {  
                        "metric": "Mortality by admission month",                      
                        "mark": "bar", // should remove this
                        "chart": "grouped",
                        "x": "3.06 Date/time arrival at hospital",
                        "y": ["1.02 Patient case record number", "4.04 Death in hospital"],
                        "yaggregates": ["count", "sum"],
                        "yfilters": {"1.02 Patient case record number": {"where": {"4.04 Death in hospital":"0. No"},
                                                                         "valid": ["1. From MI", "3. Other non cardiac related cause", "4. Other cardiac cause"]},
                                     "4.04 Death in hospital": {"where": {"4.04 Death in hospital": ["1. From MI", "3. Other non cardiac related cause", "4. Other cardiac cause"]},
                                                                "valid": ["0. No"]}
                                      },
                        "xType": "t",
                        "yType": ["q", "q"],  
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "All admissions",                        
                        "tspan": 3,                          
                        "granP": ["unit", "unit"],
                        "ehr": "Admissions",
                        "legend": ["Alive", "Deceased"],
                        /** Slave Tasks spec begin here **/
                        "categories": ["2.01 Initial diagnosis", "Admission Method (V9.1 Dataset)"],      
                        "quantities": [
                                        //{"q":"1.02 Patient case record number","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                        
                                        {"q":"der_bedDays", "granT": "admonth", "granP":["unit"], "yaggregates": "sum" }
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": ["1.02 Patient case record number", "4.04 Death in hospital"] }   // the first element holds the master view's granT                                            
         
                        },
                        {  
                        "metric": "Call-to-Balloon (STEMI Only)",                      
                        "mark": "bar", // should remove this
                        "chart": "stacked",
                        "x": "3.06 Date/time arrival at hospital",
                        "y": [ "1.02 Patient case record number", "2.01 Initial diagnosis"],
                        "yaggregates": ["count", "count"],
                        "yfilters": {"1.02 Patient case record number": {"where": {"2.01 Initial diagnosis": "1. Definite myocardial infarction",
                                                                        "3.10 Delay before treatment": "0. No" },
                                                                          "operator": "AND",
                                                                          "valid": [ // for first criterion
                                                                                    "1. Definite myocardial infarction",
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis",
                                                                                    // for second criterion
                                                                                    "0. No",
                                                                                    "1. Definite myocardial infarction",
                                                                                    "2. Clinical concern about recent cerebrovascular event or surgery",
                                                                                    "3. Delay obtaining consent",
                                                                                    "4. Initial ECG ineligible",
                                                                                    "5. Cardiac arrest",
                                                                                    "6. Obtaining consent for therapeutic trial",
                                                                                    "7. Hospital administrative failure",
                                                                                    "8. Ambulance procedural delay",
                                                                                    "9. Other",
                                                                                    "10. Ambulance 12 lead ECG not diagnostic of STEMI",
                                                                                    "11. Consideration of primary PCI",
                                                                                    "12. Ambulance administrative delay",
                                                                                    "13. Cath lab access delayed",
                                                                                    "14. Delay in activating cath lab team",
                                                                                    "15. Pre-PCI complication",
                                                                                    "16. Equipment failure",
                                                                                    "17. Convalescent STEMI"  ]
                                                                                  },
                                     "2.01 Initial diagnosis": {"where": { "2.01 Initial diagnosis":  "1. Definite myocardial infarction",
                                                                          "3.10 Delay before treatment": [
                                                                                    "1. Definite myocardial infarction",
                                                                                    "2. Clinical concern about recent cerebrovascular event or surgery",
                                                                                    "3. Delay obtaining consent",
                                                                                    "4. Initial ECG ineligible",
                                                                                    "5. Cardiac arrest",
                                                                                    "6. Obtaining consent for therapeutic trial",
                                                                                    "7. Hospital administrative failure",
                                                                                    "8. Ambulance procedural delay",
                                                                                    "9. Other",
                                                                                    "10. Ambulance 12 lead ECG not diagnostic of STEMI",
                                                                                    "11. Consideration of primary PCI",
                                                                                    "12. Ambulance administrative delay",
                                                                                    "13. Cath lab access delayed",
                                                                                    "14. Delay in activating cath lab team",
                                                                                    "15. Pre-PCI complication",
                                                                                    "16. Equipment failure",
                                                                                    "17. Convalescent STEMI"  ]},
                                                                "operator": "AND",  "valid": [// for first criterion
                                                                                    "1. Definite myocardial infarction",
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis",
                                                                                    // for second criterion
                                                                                    "0. No",
                                                                                    "1. Definite myocardial infarction",
                                                                                    "2. Clinical concern about recent cerebrovascular event or surgery",
                                                                                    "3. Delay obtaining consent",
                                                                                    "4. Initial ECG ineligible",
                                                                                    "5. Cardiac arrest",
                                                                                    "6. Obtaining consent for therapeutic trial",
                                                                                    "7. Hospital administrative failure",
                                                                                    "8. Ambulance procedural delay",
                                                                                    "9. Other",
                                                                                    "10. Ambulance 12 lead ECG not diagnostic of STEMI",
                                                                                    "11. Consideration of primary PCI",
                                                                                    "12. Ambulance administrative delay",
                                                                                    "13. Cath lab access delayed",
                                                                                    "14. Delay in activating cath lab team",
                                                                                    "15. Pre-PCI complication",
                                                                                    "16. Equipment failure",
                                                                                    "17. Convalescent STEMI"  ]
                                                                                }
                                      },
                        "xType": "t",
                        "yType": ["q", "q"],  
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "PCI Patients",                        
                        "tspan": 3,                          
                        "granP": ["unit", "unit"],
                        "ehr": "Admissions",
                        "legend": ["Meeting Target", "Not meeting target"],
                        /** Slave Tasks spec begin here **/
                        "categories": ["3.10 Delay before treatment", "Admission Method (V9.1 Dataset)"],      
                        "quantities": [
                                         {"q":"dtb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}
                                       ],                                                              
                        "granT": {"monthly-annual": [ "1.02 Patient case record number", "2.01 Initial diagnosis"] }            
         
                        },
                         {  
                        "metric": "Door-to-Angio (NSTEMI Only)",
  "chart": "stacked",
                        "mark": "bar", // should remove this
                        "x": "3.06 Date/time arrival at hospital",
                        "y": [ "dtaTarget", "dtaNoTarget", "missing"],
                        "yaggregates": [ "count", "count", "count"],
                        "legend": ["Meeting Target", "Not meeting target", "NA"],
                        "xType": "t",
                        "yType": [ "q", "q", "q"],
                        "yfilters": {"dtaTarget": {"where": {"dtaTarget": "1", "2.01 Initial diagnosis":[
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis"
                                                                                    ] },
                                                     "operator": "AND"
                                                     /*"valid": ["0", "1", "1. Definite myocardial infarction",
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis"
                                                                                    ]*/
                                                      },
                                     "dtaNoTarget": {"where": {"dtaTarget": "0", "2.01 Initial diagnosis":[
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis"
                                                                                    ] },
                                                        "operator": "AND"
                                                        /*"valid": ["0", "1", "1. Definite myocardial infarction",
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis"
                                                                                    ]*/
                                                                                },
                                      "missing": {"where": {"dtaTarget": "NA", "2.01 Initial diagnosis":[
                                                                                    "3. Acute coronary syndrome",
                                                                                    "4. Chest pain ? cause",
                                                                                    "5. Other initial diagnosis"
                                                                                    ]}, "operator": "AND"}

                                      },
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "NSTEMI Admissions",                        
                        "tspan": 3,                          
                        "granP": [ "unit", "unit", "unit"],
                        "ehr": "Admissions",
                        /** Slave Tasks spec begin here **/
                        "categories": ["Admission Method (V9.1 Dataset)", "1.07 Patient gender", "3.10 Delay before treatment"],      
                        "quantities": [
                                         {"q":"dta", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": [ "dtaTarget", "dtaNoTarget"] }   // the first element holds the master view's granT                                            
         
                         },
                         {  
                        "metric": "Gold Standard Drugs",
                        "mark": "bar", // should remove this
                        "chart": "stacked",
                        "x": "3.06 Date/time arrival at hospital",
                        "y": [ "1", "2"],
                        "yaggregates": [ "count", "count"],
                        "xType": "t",
                        "yType": [ "q", "q"],
                        "yfilters": {"1": {"where": {
                                            "P2Y12": "1",
                                            "4.05 Discharged on beta blocker": "1. Yes" ,
                                            "4.06 Angiotensin converting enzyme inhibitor or angiotensin receptor blocker": "1. Yes" ,
                                            "4.07 Discharged on statin": "1. Yes" ,
                                            "4.08 Discharged on aspirin": "1. Yes"      
                            },
                            "valid": ["0", "1", "0. No", "1. Yes" , "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"],
                            "operator": "AND"},
                           "2": {"where": {
                                            //"4.27 Discharged on a thienopyridine inhibitor": ["0", "2", "3", "4", "8", "9"] ,
                                            //"4.31 Discharged on TIcagrelor (v10.3 Dataset)": ["0", "2", "3", "4", "8", "9"] ,
                                            "P2Y12": "0",
                                            "4.05 Discharged on beta blocker": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,
                                            "4.06 Angiotensin converting enzyme inhibitor or angiotensin receptor blocker": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,
                                            "4.07 Discharged on statin": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,
                                            "4.08 Discharged on aspirin": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"]     },
                                          "valid": ["0. No", "1. Yes" ,"4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"], "operator":"OR"}  
                        },
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "Discharged patients",
                        "legend": ["All given", "Not all given"],                      
                        "tspan": 3,                          
                        "granP": [ "unit", "unit"],
                        "ehr": "Admissions",
                        /** Slave Tasks spec begin here **/
                        "categories": ["P2Y12", "4.05 Discharged on beta blocker", "4.07 Discharged on statin", "4.06 Angiotensin converting enzyme inhibitor or angiotensin receptor blocker", "4.27 Discharged on a thienopyridine inhibitor"],      
                        "quantities": [
                                        //{"q":"4.27 Discharged on a thienopyridine inhibitor","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                        
                                        //{"q":"4.31 Discharged on TIcagrelor (v10.3 Dataset)", "granT": "admonth", "granP":["unit"], "yaggregates": "count"},
                                        // {"q":"der_ctb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"},
                                         {"q":"dtb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": [ "1", "2" ] }   // the first element holds the master view's granT                                            
         
                         },
                          {  
                        "metric": "Referral for Cardiac Rehabiliation",
                        "mark": "bar", // should remove this
                        "chart": "stacked",
                        "x": "3.06 Date/time arrival at hospital",
                        "y":   ["0", "1", "3", "8", "9"], //"4.09 Cardiac rehabilitation",
                        "yaggregates": [ "count", "count", "count", "count", "count"],
                        "xType": "t",
                        "yType": "n",
                        "yfilters": {"0": {"where": {"4.09 Cardiac rehabilitation": "0. No"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },
                                      "1": {"where": {"4.09 Cardiac rehabilitation": "1. Yes"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },
                                      "3": {"where": {"4.09 Cardiac rehabilitation": "3. Patient declined"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },
                                      "8": {"where": {"4.09 Cardiac rehabilitation": "8. Not indicated"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },
                                      "9": {"where": {"4.09 Cardiac rehabilitation": "9"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] }
                                      },
                        "legend": ["No", "Yes", "Patient declined", "Not indicated", "Unknown"],
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "Num. records",                        
                        "tspan": 3,                          
                        "granP": [ "unit", "unit"],
                        "ehr": "Admissions",
                        /** Slave Tasks spec begin here **/
                        "categories": ["1.07 Patient gender", "3.10 Delay before treatment"],      
                        "quantities": [
                                        //{"q":"der_nstemi","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                        
                                        //{"q":"der_ctbTarget", "granT": "admonth", "granP":["unit"], "yaggregates": "count"},
                                         {"q":"dtaTarget", "granT": "admonth", "granP":["unit"], "yaggregates": "sum"},
                                         {"q":"dtb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": [ "0", "1", "3", "8", "9"] }   // the first element holds the master view's granT                                            
         
                         },
                          {  
                        "metric": "Accute Use of Aspirin",
                        "mark": "bar", // should remove this
                        "chart": "stacked",
                        "x": "3.06 Date/time arrival at hospital",
                        "y":   ["1", "2", "3", "4", "8"], //"4.09 Cardiac rehabilitation",
                        "yaggregates": [ "count", "count", "count", "count", "count"],
                        "xType": "t",
                        "yType": "n",
                        "yfilters": {"1": {"where": {"2.04 Where was aspirin/other antiplatelet given?": "1. Already on aspirin / antiplatelet drug"}, "valid": ["1. Already on aspirin/antiplatelet drug",                    
                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",          
                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",
                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },
                                      "2": {"where": {"2.04 Where was aspirin/other antiplatelet given?": "2. Aspirin/antiplatelet drug given out of hospital"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                    
                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",          
                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",
                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },
                                      "3": {"where": {"2.04 Where was aspirin/other antiplatelet given?": "3. Aspirin / antiplatelet drug given after arrival in hospital"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                    
                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",          
                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",
                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },
                                      "4": {"where": {"2.04 Where was aspirin/other antiplatelet given?": "4. Aspirin / antiplatelet contraindicated"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                    
                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",          
                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",
                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },
                                      "8": {"where": {"2.04 Where was aspirin/other antiplatelet given?": "8. Not given"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                    
                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",          
                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",
                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },

                                      },
                        "legend": ["Already on drug",
                                  "Given out of hospital",
                                  "Given after arrival in hospital",
                                  "Contraindicated",
                                  "Not given"
                                  ],
                        "xspan": "year",    
                        "yspan": "unit",  
                        "ylabel": "Num. records",                        
                        "tspan": 3,                          
                        "granP": [ "unit", "unit", "unit", "unit", "unit"],
                        "ehr": "Admissions",
                        /** Slave Tasks spec begin here **/
                        "categories": [ "Admission Method (V9.1 Dataset)", "3.10 Delay before treatment"],      
                        "quantities": [
                                        //{"q":"der_nstemi","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                        
                                        //{"q":"der_ctbTarget", "granT": "admonth", "granP":["unit"], "yaggregates": "count"},
                                         {"q":"dtaTarget", "granT": "admonth", "granP":["unit"], "yaggregates": "sum"},
                                         {"q":"dtb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}
                                       ], // from tasks with a single quantitative variable                                                                  
                        "granT": {"monthly-annual": [ "1", "2", "3", "4", "8"] }   // the first element holds the master view's granT                                            
         
                         }
                     
                     
                                                ]
};