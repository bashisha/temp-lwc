/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 07-07-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 **/
public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountList() {
    return [SELECT Id, Name FROM Account LIMIT 10];
  }
}
