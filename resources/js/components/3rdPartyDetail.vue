<template>
    <navbar/>

    <div class="main-container">
        <sidebar/>
        

        <div class="container">
            <h3 class="container-title">3rd Party Instruction</h3>
            <div class="container-subtitle">
                <div class="subtitle">
                    <div class="vendor-management">Vendor Management</div>
                    <span>&gt;</span>
                    <div class="party-instruction">3rd Party Instruction</div>
                </div>
                <div class="subtitle-buttons">
                    <button
                        type="button"
                        class="email-button"
                        onclick="sendEmail"
                    >
                        <font-awesome-icon
                            :icon="['fas', 'paper-plane']"
                            style="color: #ae445a"
                        />
                        Send Email
                    </button>
                    <button
                        type="button"
                        class="export-button"
                        onclick="exportExcel"
                    >
                        <font-awesome-icon
                            :icon="['fas', 'file-export']"
                            style="color: #ae445a"
                        />
                        Export
                    </button>
                </div>
            </div>

            <div class="card-container card" type="card">
                <div class="information-navigation">
                    <div class="backButton">
                        <button
                            type="button"
                            class="back-button"
                            onclick="backwards"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'chevron-left']"
                                style="color: #ae445a"
                            />
                            Back
                        </button>
                    </div>
                    <div class="terminate-modify">
                        <button
                            type="button"
                            class="terminate-button"
                            onclick="terminate"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'ban']"
                                style="color: #f90606"
                            />
                            Terminate
                        </button>
                        <button
                            type="button"
                            class="modify-button"
                            onclick="modify"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'pencil']"
                                style="color: #ae445a"
                            />
                            Modify
                        </button>
                    </div>
                </div>
                <div class="information">
                    <div class="logistic-type card">
                        <div class="information-title">Type</div>
                        <div class="information-body">Logistic Instruction</div>
                    </div>
                    <div class="list-number card">
                        <div class="information-title">Li No.</div>
                        <div class="information-body">Li-2023-0213</div>
                    </div>
                    <div class="transfer-number card">
                        <div class="information-title">Transfer No.</div>
                        <div class="information-body">0822216220622</div>
                    </div>
                    <div class="customer-name card">
                        <div class="information-title">Customer</div>
                        <div class="information-body">ADNOC-ONSHORE</div>
                    </div>
                    <div class="customer-po card">
                        <div class="information-title">Customer PO</div>
                        <div class="information-body"></div>
                    </div>
                    <div class="status card">
                        <div class="information-title">Status</div>
                        <div class="information-body">In progress</div>
                    </div>
                </div>
                <div class="information">
                    <div class="pic card">
                        <div class="information-title">Attention of</div>
                        <div class="information-body">
                            Wiennetou Joel Hermesha
                        </div>
                    </div>
                    <div class="vendor card">
                        <div class="information-title">Assigned Vendor</div>
                        <div class="information-body">
                            Agility (Abu Dhabi) PJSC
                        </div>
                    </div>
                    <div class="vendor-quitation card">
                        <div class="information-title">
                            Vendor Quitation No.
                        </div>
                        <div class="information-body">
                            MITME-AGL-01 (Appendix 1)
                        </div>
                    </div>
                    <div class="vendor-address card">
                        <div class="information-title">Vendor Address</div>
                        <div class="information-body">
                            Permata Pamulang G13 no. 28
                        </div>
                    </div>
                </div>
            </div>

            <div class="card2-container card">
                Cost detail
                <table>
                    <thead>
                        <tr>
                            <td>Description</td>
                            <td>QTY</td>
                            <td>UOM</td>
                            <td>Unit Price</td>
                            <td>Kurang jelas gambarnya</td>
                            <td>krg jelas lagi</td>
                            <td>Currency</td>
                            <td>Vat Amount</td>
                            <td>Sub Total</td>
                            <td>Total</td>
                            <td>Change To</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transportation from Rig-Site</td>
                            <td>1</td>
                            <td>Trip</td>
                            <td>1400,00</td>
                            <td>0</td>
                            <td>5</td>
                            <td>AED</td>
                            <td>70.00</td>
                            <td>1400,00</td>
                            <td>1470,00</td>
                            <td>MITME</td>
                        </tr>
                        <tr>
                            <td>Exchange Rate 1 USD = 3.657 AED</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>AED (total)</td>
                            <td>70,00</td>
                            <td>1400,00</td>
                            <td>1470,00</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>AED (total)</td>
                            <td>70,00</td>
                            <td>1400,00</td>
                            <td>1470,00</td>
                        </tr>
                    </tbody>
                </table>
                <div class="attachment-notes">
                    <div class="attachment">Attachment</div>
                    <div class="notes">Notes</div>
                </div>
            </div>
            <div class="vendor-invoice">
                <div class="vendor-title">Vendor Invoice</div>
                <button type="button" onclick="addVendorInvoice">
                    + Add Vendor Invoice
                </button>
            </div>
            <div class="card3-container card">
                <div class="card3-title">For Internal Only</div>

                <div class="card3-body">
                    <div class="attachment-internal">
                        Attachment
                        <button type="button" onclick="addAttachment">
                            + Add Attachment
                        </button>
                    </div>
                    <div class="internal-note">
                        Internal Note
                        <button type="button" onclick="addNote">
                            + Add Internal Note
                        </button>
                    </div>
                </div>
            </div>
            View Activity Note
        </div>
    </div>
</template>

<script>

import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            isExpanded : false
        }
    },

    computed:{
        ...mapGetters({
            products:"example/getData" //minta ke ExampleController.php
        })
    },
    methods:{

    },
    components: {
        "navbar" : Navbar,
        "sidebar" : Sidebar
    },
};
</script>

<style scoped>

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: min(4rem, 5vw);
  position: relative;
  min-width: 970px;
  background-color: #E8BCB9;
}

.container {
  min-width: 880px;
  width: calc(100% - 2rem);
  background-color: green;
  margin-right: 0;
  padding-top: 2rem;

}

.container-title {
  font-weight: 550;
}

.container-subtitle {
  display: flex;
  flex-direction: row;
  padding-bottom: 1em;
}

.container-subtitle .subtitle {
  width: 50%;
  display: flex;
  flex-direction: row;
}

.container-subtitle .subtitle-buttons {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  gap: 30px;
}

.subtitle .vendor-management {
  padding-right: 0.55em;
  opacity: 0.7;
}

.subtitle .party-instruction {
  padding-left: 0.55em;
  opacity: 1;
  transition: ease-in-out;
}

.subtitle .vendor-management:hover,
.subtitle .party-instruction:hover {
  cursor: pointer;
  transform: scale(1.01);
  opacity: 1;
  text-decoration: underline;
  color: #662549;
}

.subtitle-buttons .email-button,
.subtitle-buttons .export-button {
  border: 0.6px solid #ccc;
  background-color: white;
  font-size: 90%;
  font-weight: 400;
}

.email-button:hover,
.export-button:hover {
  font-weight: 500;
  background-color: #e8bcb9;
  border: 0.6px solid black;
  transform: scale(1.01);
}

.card-container {
  display: flex;
  font-size: smaller;
}

.card-container .information {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card-container .information .card {
  flex-grow: 1;
  flex-basis: 10em;
}

.card-container .information .vendor-address {
  flex-grow: 1;
  flex-basis: 36em;
}

.information-navigation {
  padding: 1em 0.5em;
  display: flex;
  flex-direction: row;
}

.information-navigation .backButton {
  width: 50%;
}

.information-navigation .terminate-modify {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
}

.back-button,
.terminate-button,
.modify-button {
  background-color: transparent;
  border: none;

}

.back-button:hover,
.terminate-button:hover,
.modify-button:hover {
  transform: scale(1.05);

}


.information-title {
  display: flex;
  padding: 0 1em;
  min-width: 11vw;
  width: 100%;
  justify-content: flex-start;
  text-align: left;
  background-color: yellow;
}

.information-body {
  display: flex;
  justify-content: flex-start;
  text-align: left;

  padding: 0 1em;
}

.vendor-address {
  width: 33.5vw;
}

.vendor-address .information-title {
  width: 100%;
}



.card2-container {
  display: flex;
  font-size: smaller;
}


.attachment-notes {
  display: flex;
  flex-direction: row;
}

.attachment-notes .attachment {
  width: 50%;
}

.vendor-invoice {
  display: flex;
  flex-direction: row;
}

.vendor-invoice .vendor-title {
  width: 60%;
}

.card3-container {
  display: flex;
}

.card3-container .card3-body {
  display: flex;
  flex-direction: row;
}

.card3-container .card3-body .attachment-internal {
  display: flex;
  flex-direction: column;
  width: 50%;
}


.card3-container .card3-body .internal-note {
  display: flex;
  flex-direction: column;
  width: 50%;
}

@media (max-width: 760px) {}

@media(min-width: 1600px) {
  .container {
    justify-content: flex-start;
    margin: 0 auto;
  }
}

</style>
