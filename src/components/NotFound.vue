<script setup>

</script>

<template>
  <div class="no-results">
    <img alt="no results" src="@/assets/images/img_empty_houses@3x.png"/>
    <p>No results found. <br> Please try another keyword.</p>
  </div>
</template>

<style scoped>
.no-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 6rem 0;
}

.no-results img {
  height: 12rem;
  padding: 20px 0;
}

.no-results p {
  text-align: center;
  color: var(--text-secondary);
  font-size: 18px;
}

@media (max-width: 768px) {
  .no-results img {
    height: 8rem;
    padding: 20px 0;
  }

  .no-results p {
    font-size: 14px;
  }
}
</style>