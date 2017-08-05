<template>
    <div class="app-container">
        <app-header></app-header>
        <app-content></app-content>
        <app-footer></app-footer>
    </div>
</template>

<script>
  import header from './header/header.vue';
  import content from './content/content.vue';
  import footer from './footer/footer.vue';

  export default {
      components: {
          'app-header': header,
          'app-content': content,
          'app-footer': footer
      }
  }
</script>

<style lang="sass" src="./reset.scss"></style>
<style lang="sass" src="./base.scss"></style>
<style lang="sass" src="./app.scss"></style>