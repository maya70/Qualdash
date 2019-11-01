$Q.Picanet = {

  "availMetrics": [{"value": "Mortality by month of admission",
                    "text": "Mortality by month of admission"},

                    {"value": "48h Readmission",
                      "text": "48h Readmission"},

                    {"value": "Bed Days and Ventilation",
                    "text": "Bed Days and Ventilation"},
                 
                    {"value": "Dependency",
                      "text": "Dependency"},

                    {"value": "Data Quality",
                     "text": "Data Quality"}

                    ],

"variableDict": {"PrimReasonDescription": "Diagnosis",
                 "unplannedextubation": "Unplanned Extubation",
                 "UnitDisStatus": "Deaths",
                 "missing1": "Group 1: fields containing missing values",
                 "missing2": "Group 2: fields containing missing values",
                 "missing3": "Group 3: fields containing missing values",
                 "missing4": "Group 4: fields containing missing values",
                  "AdTypeDescription": "Ad. type",
                  "SexDescription": "Gender",
                  "EventID": "Admissions",
                  "der_death": "Deaths in unit",
                  "der_smr": "SMR",
                  "der_discharge": "Discharges",
                  "der_readmit": "Readmissions",
                  "EthnicDescription": "Ethnic",
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

"displayVariables": [{  "metric": "Mortality by month of admission",

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

                        "categories": ["PrimReasonDescription","AdTypeDescription", "EthnicDescription"],     

                        "quantities": [{"q":"PIM3","granT": "AdDate", "granP":["unit"], "yaggregates": "sum" }], // from tasks with a single quantitative variable                                                                  

                        "granT": {"monthly-annual": ["EventID", "UnitDisStatus"] }   // the first element holds the master view's granT                                            

          

                     },

                     {  "metric": "48h Readmission",

                        "mark": "bar",
                        "chart": "stacked",
                        "x": "UnitDisDate",

                        "y": ["UnitDisStatus", "der_readmit"],

                        "categories": ["SourceAdDescription", "CareAreaAdDescription", "UnitDisDestDescription"],

                        "quantities": [{"q":"der_readmit", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" },

                                      {"q":"AdTypeDescription", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum", "filters": {"where": { "AdTypeDescription": ["2", "4"] } } }],

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

                      {  "metric": "Bed Days and Ventilation",

                        "mark": "bar",
                        "chart": "stacked",
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

                        "categories": ["InvVent"],

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

                        "categories": ["PrimReasonDescription","AdTypeDescription", "SexDescription", "EthnicDescription"],     

                        "quantities": [ {"q":"XB09Z", "granT": "admonth", "granP":["unit"], "yaggregates": "sum" },

                                        {"q":"XB07Z", "granT": "admonth", "granP":["unit"] , "yaggregates": "sum" },

                                        {"q":"PIM3", "granT": "admonth", "granP":["unit","national"], "yaggregates": "sum" }

                                       ], // from tasks with a single quantitative variable                                                                  

                        "granT": {"monthly-annual": ["XB09Z", "XB07Z"]}   // the first element holds the master view's granT                                            

          

                     },

                      {

                      "metric": "Data Quality",

                      "mark": "bar", // should remove this
                      "chart": "stacked",
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

    "availMetrics": [{"value": "Mortality by month of admission",

                        "text": "Mortality by month of admission"},

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

    "variableDict": {"NHS number": "Admissions",

                      "der_discharge": "Discharges",

                      "der_readmit": "Readmissions",

                      "der_stemi": "PCI patients",

                      "der_nstemi": "NSTEMI admissions",

                      "der_ctbTarget": "CTB Not meeting target",

                      "der_angioTarget": "DTA meeting target",

                      "der_ctbTargetMet": "Met target",

                      "der_ctb": "Avgerage CTB",

                      "der_bedDays": "Bed Days",

                      "dtb": "Door-to-Balloon"

                      },

    "displayVariables": [

                         {  

                        "metric": "Mortality by month of admission",                     

                        "mark": "bar", // should remove this

                        "chart": "grouped",

                        "x": "Arrival at hospital",

                        "y": ["NHS number", "Death in hospital"],

                        "yaggregates": ["count", "sum"],

                        "yfilters": {"NHS number": {"where": {"Death in hospital":"0. No"},

                                                                         "valid": ["1. From MI", "3. Other non cardiac related cause", "4. Other cardiac cause"]},

                                     "Death in hospital": {"where": {"Death in hospital": ["1. From MI", "3. Other non cardiac related cause", "4. Other cardiac cause"]},

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

                        "categories": ["Admission diagnosis", "Method of Admission"],     

                        "quantities": [

                                        //{"q":"NHS number","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                        

                                        {"q":"der_bedDays", "granT": "admonth", "granP":["unit"], "yaggregates": "sum" }

                                       ], // from tasks with a single quantitative variable                                                                  

                        "granT": {"monthly-annual": ["NHS number", "Death in hospital"] }   // the first element holds the master view's granT                                            

          

                        },

                        { 

                        "metric": "Call-to-Balloon (STEMI Only)",                     

                        "mark": "bar", // should remove this

                        "chart": "stacked",

                        "x": "Arrival at hospital",

                        "y": [ "NHS number", "Admission diagnosis"],

                        "yaggregates": ["count", "count"],

                        "yfilters": {"NHS number": {"where": {"Admission diagnosis": "1. Definite myocardial infarction",

                                                                        "Justified Delay": "0. No" },

                                                                          "operator": "AND",

                                                                          "valid": [ // for first criterion

                                                                                    "1. Definite myocardial infarction",

                                                                                    "3. Acute Coronary Syndrome",

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

                                     "Admission diagnosis": {"where": { "Admission diagnosis":  "1. Definite myocardial infarction",

                                                                          "Justified Delay": [

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

                                                                                    "3. Acute Coronary Syndrome",

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

                        "categories": ["Justified Delay", "Method of Admission"],     

                        "quantities": [

                                         {"q":"dtb", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}

                                       ],                                                              

                        "granT": {"monthly-annual": [ "NHS number", "Admission diagnosis"] }            

          

                        },

                         { 

                        "metric": "Door-to-Angio (NSTEMI Only)",

                        "mark": "bar", // should remove this
                        "chart": "stacked",

                        "x": "Arrival at hospital",

                        "y": [ "dtaTarget", "dtaNoTarget", "missing"],

                        "yaggregates": [ "count", "count", "count"],

                        "legend": ["Meeting Target", "Not meeting target", "NA"],

                        "xType": "t",

                        "yType": [ "q", "q", "q"],

                        "yfilters": {"dtaTarget": {"where": {"dtaTarget": "1", "Admission diagnosis":[

                                                                                    "3. Acute Coronary Syndrome",

                                                                                    "4. Chest pain ? cause",

                                                                                    "5. Other initial diagnosis"

                                                                                    ] },

                                                     "operator": "AND"

                                                     /*"valid": ["0", "1", "1. Definite myocardial infarction",

                                                                                    "3. Acute Coronary Syndrome",

                                                                                    "4. Chest pain ? cause",

                                                                                    "5. Other initial diagnosis"

                                                                                    ]*/

                                                      },

                                     "dtaNoTarget": {"where": {"dtaTarget": "0", "Admission diagnosis":[

                                                                                    "3. Acute Coronary Syndrome",

                                                                                    "4. Chest pain ? cause",

                                                                                    "5. Other initial diagnosis"

                                                                                    ] },

                                                        "operator": "AND"

                                                        /*"valid": ["0", "1", "1. Definite myocardial infarction",

                                                                                    "3. Acute Coronary Syndrome",

                                                                                    "4. Chest pain ? cause",

                                                                                    "5. Other initial diagnosis"

                                                                                    ]*/

                                                                                },

                                      "missing": {"where": {"dtaTarget": "NA", "Admission diagnosis":[

                                                                                    "3. Acute Coronary Syndrome",

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

                        "categories": ["Method of Admission", "Gender", "Justified Delay"],     

                        "quantities": [

                                         {"q":"dta", "granT": "admonth", "granP":["unit"], "yaggregates": "average"}

                                       ], // from tasks with a single quantitative variable                                                                  

                        "granT": {"monthly-annual": [ "dtaTarget", "dtaNoTarget"] }   // the first element holds the master view's granT                                            

          

                         },

                         { 

                        "metric": "Gold Standard Drugs",

                        "mark": "bar", // should remove this

                        "chart": "stacked",

                        "x": "Arrival at hospital",

                        "y": [ "1", "2"],

                        "yaggregates": [ "count", "count"],

                        "xType": "t",

                        "yType": [ "q", "q"],

                        "yfilters": {"1": {"where": {

                                            "P2Y12": "1",

                                            "Beta blocker": "1. Yes" ,

                                            "Angiotensin II Blocker": "1. Yes" ,

                                            "Statin": "1. Yes" ,

                                            "Aspirin or other anti-platelet drug": "1. Yes"     

                            },

                            "valid": ["0", "1", "0. No", "1. Yes" , "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"],

                            "operator": "AND"},

                           "2": {"where": {

                                            //"Thienopyridine_inhibitor_disch": ["0", "2", "3", "4", "8", "9"] ,

                                            //"4.31 Discharged on TIcagrelor (v10.3 Dataset)": ["0", "2", "3", "4", "8", "9"] ,

                                            "P2Y12": "0",

                                            "Beta blocker": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,

                                            "Angiotensin II Blocker": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,

                                            "Statin": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"] ,

                                            "Aspirin or other anti-platelet drug": ["0. No", "4. Not applicable","2. Contraindicated", "3. Patient declined treatment", "8. Not indicated"]     },

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

                        "categories": ["P2Y12", "Beta blocker", "Statin", "Angiotensin II Blocker", "Thienopyridine_inhibitor_disch"],     

                        "quantities": [

                                        //{"q":"Thienopyridine_inhibitor_disch","granT": "admonth", "granP":["unit"], "yaggregates": "count" },                                         

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

                        "x": "Arrival at hospital",

                        "y":   ["0", "1", "3", "8", "9"], //"Cardiac rehabilitation",

                        "yaggregates": [ "count", "count", "count", "count", "count"],

                        "xType": "t",

                        "yType": "n",

                        "yfilters": {"0": {"where": {"Cardiac rehabilitation": "0. No"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },

                                      "1": {"where": {"Cardiac rehabilitation": "1. Yes"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },

                                      "3": {"where": {"Cardiac rehabilitation": "3. Patient declined"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },

                                      "8": {"where": {"Cardiac rehabilitation": "8. Not indicated"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] },

                                      "9": {"where": {"Cardiac rehabilitation": "9"}, "valid": ["0. No", "1. Yes", "3. Patient declined", "8. Not indicated"] }

                                      },

                        "legend": ["No", "Yes", "Patient declined", "Not indicated", "Unknown"],

                        "xspan": "year",   

                        "yspan": "unit", 

                        "ylabel": "Num. records",                       

                        "tspan": 3,                          

                        "granP": [ "unit", "unit"],

                        "ehr": "Admissions",

                        /** Slave Tasks spec begin here **/

                        "categories": ["Gender", "Justified Delay"],     

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

                        "x": "Arrival at hospital",

                        "y":   ["1", "2", "3", "4", "8"], //"Cardiac rehabilitation",

                        "yaggregates": [ "count", "count", "count", "count", "count"],

                        "xType": "t",

                        "yType": "n",

                        "yfilters": {"1": {"where": {"Did the patient receive aspirin during admission?": "1. Already on aspirin/antiplatelet drug"}, "valid": ["1. Already on aspirin / antiplatelet drug",                   

                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",         

                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",

                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },

                                      "2": {"where": {"Did the patient receive aspirin during admission?": "2. Aspirin / antiplatelet drug given out of hospital"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                   

                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",         

                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",

                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },

                                      "3": {"where": {"Did the patient receive aspirin during admission?": "3. Aspirin / antiplatelet drug given after arrival in hospital"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                   

                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",         

                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",

                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },

                                      "4": {"where": {"Did the patient receive aspirin during admission?": "4. Aspirin / antiplatelet contraindicated"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                   

                                                                                       "2. Aspirin / antiplatelet drug given out of hospital",         

                                                                                       "3. Aspirin / antiplatelet drug given after arrival in hospital",

                                                                                       "4. Aspirin / antiplatelet contraindicated", "8. Not given" ] },

                                      "8": {"where": {"Did the patient receive aspirin during admission?": "8. Not given"}, "valid": [ "1. Already on aspirin / antiplatelet drug",                   

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

                        "categories": [ "Method of Admission", "Justified Delay"],     

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

 

 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

 

 

 

 
