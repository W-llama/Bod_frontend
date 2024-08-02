<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <p><slot></slot></p>
      <div class="btn-group">
        <button @click="$emit('confirm')" class="btn">확인</button>
        <button @click="$emit('cancel')" class="btn">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal'
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.btn-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background: #5a67d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background: #4c51bf;
}
</style>
