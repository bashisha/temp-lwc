%dw 2.0
input payload application/json
output application/apex
---
payload.ConsumerProfileList map(item) -> { 
    firstName :item.ConsumerMarketingPerson.ConsumerMarketingPersonName.FirstName,
middleName :item.ConsumerMarketingPerson.ConsumerMarketingPersonName.MiddleName,
lastName :item.ConsumerMarketingPerson.ConsumerMarketingPersonName.LastName,
nameSuffix :item.ConsumerMarketingPerson.ConsumerMarketingPersonName.Suffix,
dateOfBirth : item.ConsumerMarketingPerson.BirthDateInformation.BirthDate,

gender :  item.ConsumerMarketingPerson.Gender.GenderCode match {
 case val if val==0 -> "Male"
 case val if val==1 -> "Female"
 case val if val==2 -> "Unknown"
 case val if val==3 -> "Neutral"
},
isDeceased : item.ConsumerMarketingPerson.DeceasedInformation.DeceasedFlagInfo.DeceasedIndicator,
deathDate : item.ConsumerMarketingPerson.DeceasedInformation.DeathDateInfo.DeathDate
} as Object {class: "SearchResult"}
