import { LightningElement, wire } from "lwc";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";
import getAllOpps from "@salesforce/apex/OpportunityController.getAllOpps";
import { CurrentPageReference } from "lightning/navigation";

export default class JsTestCmp extends LightningElement {
  message = "World";
  greeting = "";
  accounts;
  error;
  opps;
  oppError;
  connectedCallback() {
    this.getAllOpportunities();
  }

  getAllOpportunities() {
    getAllOpps()
      .then((x) => {
        this.opps = x;
      })
      .catch((err) => {
        this.oppError = err;
      });
  }

  @wire(CurrentPageReference) pageRef;

  @wire(getAccountList)
  wiredAccounts({ error, data }) {
    if (data) {
      this.accounts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.accounts = undefined;
    }
  }

  handleChange(event) {
    this.message = event.target.value;
  }

  get currentPageRef() {
    return this.pageRef ? JSON.stringify(this.pageRef, null, 2) : "";
  }
}
