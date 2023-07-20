@isTest
public with sharing class TestClass {
    
        @isTest
        public static void TestClass() {
            String inputCsv = 'first_name,last_name,email\nCodey,"The Bear",codey@salesforce.com'; 
            DataWeave.Script dwscript = DataWeave.Script.createScript('csvToContacts');
            DataWeave.Result dwresult = dwscript.execute(new Map<String, Object>{'records' => inputCsv});
            List<Contact> results = (List<Contact>)dwresult.getValue();
            
            Assert.areEqual(1, results.size());
            Contact codeyContact = results[0];
            Assert.areEqual('Codey',codeyContact.FirstName);
            Assert.areEqual('The Bear',codeyContact.LastName);

            StaticResource sr = [SELECT Id, Body from StaticResource Where Name = 'csp' LIMIT 1];
        string responseBody = sr.body.toString();

        DataWeave.Script dwscript2 = DataWeave.Script.createScript('jsonToSearchResult');
            DataWeave.Result dwresult2 = dwscript2.execute(new Map<String, Object>{'payload' => responseBody});
            List<SearchResult> results2 = (List<SearchResult>)dwresult2.getValue();
            Assert.areEqual(true, results2.size()>0);
        }
    
}