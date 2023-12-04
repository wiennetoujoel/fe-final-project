<template @click="closePopUpTerminate">
    <div class="terminate-overlay">
        <div class="container">
            <div class="container-title">Reasons of Cancellation</div>
            <div class="admin-in-charge">
                <div class="admin-title">Cancelled by</div>
                <div class="admin-name">{{ adminOnline }}</div>
            </div>
            <div class="description">
                <div class="description-title">Description</div>
                <div class="input-class">
                    <textarea
                        type="text"
                        placeholder="Enter Your Note"
                        v-model="userInput"
                    />
                </div>
            </div>

            <div class="attachment">
                <div class="attachment-tile">Attachment</div>
                <button type="button" class="attachment-button">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Add Attachment
                </button>
                
            </div>

            <div class="action-buttons">
                <button
                    type="button"
                    class="cancel-button"
                    @click="closePopUpTerminate"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    class="submit-button"
                    @click="submitPopUpTerminate"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed:{
        ...mapGetters({
            adminOnline: "example/adminOnline", //minta ke getters
        }),
    },

    methods: {
        closePopUpTerminate() {
            this.$emit("emit-closePopUpTerminate");
        },

        submitPopUpTerminate() {
            this.$emit("emit-closePopUpTerminate");

            
        },
    },
};
</script>

<style scoped>
.terminate-overlay {
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

.action-buttons{
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
