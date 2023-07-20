public class SearchResult {
    @AuraEnabled
    public String firstName;
    @AuraEnabled
    public String middleName;
    @AuraEnabled
    public String lastName;
    @AuraEnabled
    public String nameSuffix;
    @AuraEnabled
    public String personId;
    @AuraEnabled
    public Date dateOfBirth;
    @AuraEnabled
    public Date deathDate;
    @AuraEnabled
    public Boolean isDeceased;
    @AuraEnabled
    public String gender;
    @AuraEnabled
    public String SSN;
    @AuraEnabled
    public String SSNLast4;
    @AuraEnabled
    public String homePhone;
    @AuraEnabled
    public String workPhone;
    @AuraEnabled
    public String city;
    @AuraEnabled
    public String postalCode;
    @AuraEnabled
    public String stateProvince;
    @AuraEnabled
    public List<String> addressLines;
    @AuraEnabled
    public List<String> sourceSystemIds;
    @AuraEnabled
    public List<String> lstEmails;
    @AuraEnabled
    public Map<String,Date> mapContractNumberToTerminationDate;
    @AuraEnabled
    public List<String> lstContactIds;
}