<template>
<Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Are you sure you want to delete your account?
                </h2>

                <p class="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                    />

                   
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton > Cancel </SecondaryButton>

                    <DangerButton
                        class="ml-3"
                    >
                        Delete Account
                    </DangerButton>
                </div>
            </div>
        </Modal>
</template>
<script setup>
import DangerButton from '@/Components/DangerButton.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { nextTick, ref } from 'vue';

definePageMeta({
  layout: "panel",
});

const confirmingUserDeletion = ref(true);
const passwordInput = ref(null);

const form = ref(null);

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
        closeModal()
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
};
</script>