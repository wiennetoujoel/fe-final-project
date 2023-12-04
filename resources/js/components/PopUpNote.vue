<template @click="closePopUpNote">
    <div class="note-overlay">
        <div class="container">
            <div class="container-title">Internal Note</div>

            <div class="description">
                <div class="description-title">
                    by {{ adminOnline }} on {{ formattedDateTime }}
                </div>
                <div v-if="noteWarning" class="warning">
                    *Please fill the note
                </div>
                <div class="input-class">
                    <textarea
                        type="text"
                        placeholder="Enter Your Note"
                        v-model="userInput"
                    />
                </div>
            </div>

            <div class="action-buttons">
                <button
                    type="button"
                    class="cancel-button"
                    @click="closePopUpNote"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="submit-button"
                    @click="submitPopUpNote"
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
    props: ["filteredProducts", "editingNoteData"],
    data() {
        return {
            formattedDateTime: "",
            userInput: this.editingNoteData ? this.editingNoteData.notes : "",
            noteWarning : false,
            
        };
    },

    computed: {
        ...mapGetters({
            adminOnline: "example/adminOnline", //minta ke getters
        }),
    },

    mounted() {
        this.updateDateTime();
    },

    methods: {
        closePopUpNote() {
            this.$emit("emit-closePopUpNote");
        },

        submitPopUpNote() {

            if(this.userInput === ""){
                this.noteWarning = true;
                return;
            }else{
                this.noteWarning = false
            }
            
            if (this.editingNoteData) {
                console.log("editingNoteData isinya",this.editingNoteData)
                //untuk kasus edit data (agar tidak buat notes baru)
                this.editingNoteData.notes = this.userInput;
                this.editingNoteData.formattedDateTime = this.formattedDateTime
            } else {
                //buat note baru
                const newInternalNote = {
                    id: `IN-${new Date().getTime()}`,
                    adminName: this.adminOnline,
                    formattedDateTime: this.formattedDateTime,
                    notes: this.userInput,
                };
                this.filteredProducts.internalNotes.push(newInternalNote);
            }

    
            this.$emit("emit-closePopUpNote");
        },

        updateDateTime() {
            const currentTime = new Date();
            const year = currentTime.getFullYear();
            const month = currentTime.getMonth() + 1; 
            const day = currentTime.getDate();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();

           
            this.formattedDateTime = `${this.formatDate(day)}/${this.formatDate(
                month
            )}/${year} ${this.formatTime(hours)}:${this.formatTime(minutes)}`;

            
            setTimeout(() => {
                this.updateDateTime();
            }, 60000);
        },
        formatDate(value) {
            
            return value < 10 ? "0" + value : value;
        },
        formatTime(value) {
           
            return value < 10 ? "0" + value : value;
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

.container-title {
    margin: 0 auto;
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    display: flex;
    justify-content: center;
}

.admin-in-charge,
.description {
    margin-top: 0.5rem;
}

.admin-title,
.description-title {
    font-size: 0.8rem;
}

.admin-name {
    font-size: 1.1rem;
    font-weight: 600;
}

.description .input-class {
    width: 100%;
    min-height: 5vw;
    background-color: #fcfbfb;
    color: black;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s;
    padding: 0;
    margin: 0;
}

.input-class textarea {
    border: none;
    width: 100%;
    min-height: 5vw;
    margin: 0;
}

.description textarea:focus {
    outline: none;
}

.description input::placeholder {
    font-style: italic;
}

.attachment-button {
    color: #090909;
    padding: 0.5rem 1.3rem;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    margin: 0;
    margin-top: 0.7rem;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
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

.warning{
    font-style: italic;
    color: red;
    font-weight: 300;
    opacity: 0.9;
    font-size: smaller;
}
</style>
