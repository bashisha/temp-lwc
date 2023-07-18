import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import { CurrentPageReference } from "lightning/navigation";

export default class HelloWorld extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields: [ACCOUNT_NAME_FIELD] })
  wiredRecord;

  @wire(CurrentPageReference) pageRef;
  get currentPageRef() {
    return this.pageRef ? JSON.stringify(this.pageRef, null, 2) : "";
  }

  message = "JEST Test!";

  handleChange(event) {
    this.message = event.target.value;
  }
}
