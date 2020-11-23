<script>
    import Textfield from '@smui/textfield'
  
    export let name = '';
    export let email = '';
    export let comment = '';
</script>

<Textfield bind:value={name} label="Name" />
<br />
<Textfield type="email" bind:value={email} label="Email" input$autocomplete="email" />
<br />
<Textfield textarea bind:value={comment} label="Comment" />

