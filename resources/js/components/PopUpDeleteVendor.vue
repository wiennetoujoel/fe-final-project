<template @click="closePopUpNote">
    <div class="note-overlay">
        <div class="container">
            <div class="warning">
                <div class="warning-icon">
                    <font-awesome-icon
                        :icon="['fas', 'triangle-exclamation']"
                    />
                </div>
                <div class="warning-message">
                    Are you sure to delete this vendor invoice?
                </div>
                <div class="warning-message-2">
                    This action cannot be undone
                </div>
            </div>

            <div class="action-buttons">
                <button
                    type="button"
                    class="cancel-button"
                    @click="closePopUpDeleteVendor"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="submit-button"
                    @click="submitPopUpDeleteVendor"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: ["filteredProducts", "documentIdToDelete"],
    data() {
        return {
            formattedDateTime: "",
        };
    },

    computed: {
        ...mapGetters({
            adminOnline: "example/adminOnline", //minta ke getters
        }),
    },

    methods: {
        closePopUpDeleteVendor() {
            this.$emit("emit-closePopUpDeleteVendor");
        },

        submitPopUpDeleteVendor() {

            const deletedVendor = this.documentIdToDelete;

            const deleteVendor = this.filteredProducts.vendorInvoice.findIndex(
                (invoice) => invoice.vendorNumber === deletedVendor
            );

            if (deleteVendor !== -1) {
                this.filteredProducts.vendorInvoice.splice(deleteVendor, 1);
            }

            this.$emit("emit-closePopUpDeleteVendor");
        },
    },
};
</script>

<style scoped>
.note-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    border: 1px solid black;
    width: 40%;
    min-width: 500px;
    margin: 0;
    transform: translate(-50%, -50%);
    padding: 1rem;
}

.warning {
    display: flex;
    text-align: center;
    flex-direction: column;
}

.warning-icon {
    font-size: 3rem;
}

.warning-message {
    font-size: 1.2rem;
}

.warning-message-2 {
    font-size: 0.8rem;
    opacity: 0.8;
}

.action-buttons {
    margin-top: 1.3rem;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
}

.cancel-button,
.submit-button {
    transform: scale(0.8);
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    width: 20%;
    margin: 5px;
    color: #fff;
}

.cancel-button {
    background-color: #e74c3c;
}

.submit-button {
    background-color: #2ecc71;
}

.cancel-button:hover {
    background-color: #c0392b;
}

.submit-button:hover {
    background-color: #27ae60;
}
</style>
