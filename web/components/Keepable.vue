<template>
  <keep-alive>
    <component :is="'div'"><slot /></component>
  </keep-alive>
</template>

<script>
export default { name: 'Keepable' }
</script>
