<script>
    import Header from "./Header.svelte";
    import Resize from "./Resize.svelte";
    import Sidebar from "./Sidebar.svelte";
</script>




<Header />
<div class="MainDisplay">
    <Sidebar />
    <Resize />
</div>



<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
    .MainDisplay {
        display: flex;
        flex-direction: row;
    }
</style>