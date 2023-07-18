/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 07-07-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 **/
public with sharing class OpportunityController {
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getAllOpps() {
    return [SELECT Id, Name FROM Opportunity LIMIT 10];
  }
}
