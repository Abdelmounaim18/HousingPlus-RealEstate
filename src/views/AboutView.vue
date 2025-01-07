<script setup>
</script>

<template>
  <div class="about-content">
    <section class="about-section">
      <h1>About HousingPlus Real Estate</h1>
      <p>
        Welcome to HousingPlus Real Estate, your <i>go to</i> platform for finding the best houses and properties in the market.
        Our mission is to streamline the property search and acquisition process, making it as seamless and enjoyable as
        possible!
        Whether you are going to buy, sell, or just look around, HousingPlus Real Estate provides a comprehensive and
        user-friendly experience to help you make informed decisions.
      </p>
      <p>
        At HousingPlus Real Estate, we leverage cutting-edge technology and industry expertise to bring you the latest listings
        and market trends.
        Our dedicated team of professionals is committed to providing exceptional service and support, ensuring that you
        find your dream home or investment property with ease.
      </p>
    </section>
    <section class="about-section">
      <h2>Design and Development</h2>
      <div class="about-company">
        <img alt="HousingPlus" class="company-logo" src="@/assets/images/img_logo_HousingPlus@3x.png"/>
        <div class="company-info">
          <p>Developed by</p>
          <a href="https://hello.devvpod.com" target="_blank">Abdelmounaim 👋</a>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
.about-content {
  padding: 0 20px;
}

.about-section {
  margin-bottom: 40px;
}

.about-section p {
  color: var(--text-secondary);
}

.about-company {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.company-logo {
  height: 50px;
  margin-right: 20px;
  border-radius: 15%;
}

.company-info p {
  margin: 0;
  font-weight: bold;
}

.company-info a {
  color: var(--text-link);
  text-decoration: none;
}
</style>
