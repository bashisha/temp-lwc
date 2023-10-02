public virtual with sharing class TodoService {
    public virtual List<Todo__c> getTodos() {
        return [SELECT Id, Name FROM Todo__c];
    }
}