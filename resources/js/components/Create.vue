<template>
    <navbar />

    <div class="main-container">
        <sidebar />
        <div class="container">
            <Header />

            <!-- form to create -->
            <div class="card pe-3">
                <form action="">
                    <div class="container text-start">
                        <!-- instruction data -->
                        <div class="row mb-3">
                            <div class="col-2">
                                <select class="form-select" aria-label="Default select example" id="instructionType" name="instructionType" required>
                                    <option disabled selected hidden value="">Select menu ...</option>
                                    <option value="logistic">Logistic Instruction</option>
                                    <option value="service">Service Instruction</option>
                                </select>
                            </div>
                            <div class="col-10 text-end">
                                <button type="button" class="btn btn-secondary rounded-pill py-0" disabled>Draft</button>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                
                            </div>
                            <div class="col">
                                <p class="mb-0">Assigned Vendor</p>
                                <select class="form-select" aria-label="Default select example" id="instructionType" name="instructionType" required>
                                    <option disabled selected hidden value="">Enter Vendor</option>
                                    <option value="item" v-for="(item, index) in assignedVendor" :key="index">{{ item }}</option>
                                </select>
                            </div>
                            <div class="col">
                                <p class="mb-0">Attention Of</p>
                                <input class="form-control" type="text" placeholder="Enter Attention Of" aria-label="default input example" required>
                            </div>
                            <div class="col">
                                <p class="mb-0">Quotation No.</p>
                                <input class="form-control" type="text" placeholder="Enter Quotation" aria-label="default input example" required>
                            </div>
                            <div class="col">
                                <p class="mb-0">Invoice To</p>
                                <select class="form-select" aria-label="Default select example" id="instructionType" name="instructionType" required>
                                    <option disabled selected hidden value="" class="text-secondary">Select an Option</option>
                                    <option value="MITO">MITO</option>
                                    <option value=""> 
                                        <button>Haii</button> <!-- option cannot rander tag button and other element, hanya render unicode -->
                                    </option>
                                </select>
                            </div>
                            <div class="col">
                                <p class="mb-0">Customer - Contract </p>
                                <select class="form-select" aria-label="Default select example" id="instructionType" name="instructionType" required>
                                    <option disabled selected hidden value="" class="text-secondary">Enter Vendor</option>
                                    <option value="item" v-for="(item, index) in customerContract" :key="index">{{ item }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-2">
                                
                            </div>
                            <div class="col-8">
                                <p class="mb-0">Vendor Address</p>
                                <!-- <label for="exampleDataList" class="form-label">Datalist example</label> -->
                                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
                                <datalist id="datalistOptions">
                                    <option value="San Francisco"></option>
                                    <option value="New York"></option>
                                    <option value="Seattle"></option>
                                    <option value="Los Angeles"></option>
                                    <option value="Chicago"></option>
                                </datalist>
                            </div>
                            <div class="col-2">
                                <p class="mb-0">Customer PO No.</p>
                                <input class="form-control" type="text" placeholder="Enter Customer PO" aria-label="default input example" required>
                            </div>
                        </div>

                        <!-- cost detail -->
                        <div class="row text-start">
                            <h3>Cost Detail</h3>
                        </div>
                        <div class="row text-center ">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">UOM</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">GST(%)</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Vat Amount</th>
                                        <th scope="col">Sub Total</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Charge To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input class="form-control" type="text" placeholder="Enter Description" aria-label="default input example" id="description" name="description" required>
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="Enter Qty" aria-label="default input example" id="qty" name="qty">
                                        </td>
                                        <td>
                                            <select class="form-select" aria-label="Default select example" id="uom" name="uom" required>
                                                <option selected disabled hidden value="">Select UOM</option>
                                                <option value="SHP">SHP</option>
                                                <option value="BILL">BILL</option>
                                                <option value="HRS">HRS</option>
                                                <option value="MEN">MEN</option>
                                                <option value="PCS">PCS</option>
                                                <option value="TRIP">TRIP</option>
                                                <option value="MT">MT</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="Enter Unit Price" aria-label="default input example" id="unitPrice" name="unitPrice">
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="Enter GST" aria-label="default input example" value="0" id="gst" name="gsgt">
                                        </td>
                                        <td>
                                            <select class="form-select" aria-label="Default select example" id="currency" name="currency">
                                                <option selected disabled hidden value=""></option>
                                                <option value="USD">USD</option>
                                                <option value="AUD">AUD</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="VAT Amount" aria-label="default input example" value="0.00" id="vatAmount" name="vatAmount">
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="Sub Total" aria-label="default input example" value="0.00" id="subTotal" name="subTotal">
                                        </td>
                                        <td>
                                            <input class="form-control" type="number" placeholder="Total" aria-label="default input example" value="0.00" id="total" name="total">
                                        </td>
                                        <td>
                                            <select class="form-select" aria-label="Default select example" id="chargeTo" name="chargeTo" required>
                                                <option selected disabled hidden value="">Select an Option</option>
                                                <option value="MITO">MITO</option>
                                                <option value="Customer">Customer</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-secondary" @click="">
                                                <font-awesome-icon icon="minus" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <button type="button" class="btn btn-info" @click="">
                                                <font-awesome-icon icon="plus" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- attachment -->
                        <div class="row mb-5 text-start">
                            <div class="col">
                                <p class="mb-0">Attachment</p>
                                <input class="form-control" type="file" id="formFile" name="formFile">
                                
                            </div>
                            <div class="col">
                                <p class="mb-0">Notes</p>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" required></textarea>
                            </div>
                        </div>

                        <!-- link to -->
                        <div class="row mb-5 text-start">
                            <div class="col">
                                <p class="mb-0">Link To</p>
                                <select class="form-select" aria-label="Default select example" id="chargeTo" name="chargeTo" required>
                                    <option selected disabled hidden value="">Select Item</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                </select>
                            </div>
                        </div>
    
                        <!-- button  -->
                        <div class="row mt-5 text-end justify-content-end">
                            <div class="col-1">
                                <button class="btn btn-light" type="submit">Cancel</button>
                            </div>
                            <div class="col-2 text-center">
                                <button class="btn btn-light border border-secondary" type="submit">Save as Draft</button>
                            </div>
                            <div class="col-1">
                                <button class="btn btn-info" type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue"

export default {
    components: {
        navbar: Navbar,
        sidebar: Sidebar,
        Header,
    },
    data() {
        return {
            isExpanded: false,
            assignedVendor: [
                'Machine Shop 1', 'Neil Mansell Transport', 'Beattie Transport', 'Qube Logistic', 'Symons Group', 'Gearhart United - Dampier', 'Ozoon API - Dalby'
            ],
            customerContract: [
                '3-1/2 EUE Tubing', 'AGE Developments Pty Ltd', 'AGED AGE0336', 'AGL Gas Storage Pty Ltd', 'AGL Upstream Investments Ltd'
            ]
            
        };
    },
};
</script>

<style scoped>
:root {
    --first-color: #1d1a39;
    --second-color: #451952;
    --third-color: #662549;
    --fourth-color: #ae445a;
    --fifth-color: #f39f5a;
    ---sixth-color: #e8bcb9;
}
.main-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: min(4rem, 5vw);
    position: relative;
    min-width: 1020px;
    background-color: #ccc;
}
.container {
    min-width: 970px;
    width: calc(100% - 2rem);
    margin-right: 0;
    padding-top: 2rem;
    min-height: 100vh;
}



@media (max-width: 760px) {
}

@media (min-width: 1440px) {
    .container {
        justify-content: flex-start;
        margin: 0 auto;
    }

    .information-title {
        min-width: 0vw;
    }
}
</style>
