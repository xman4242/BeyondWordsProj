<script>
    import Header from "./Header.svelte";
    import Resize from "./Resize.svelte";
    import Sidebar from "./Sidebar.svelte";
</script>



<div>
    <Header />
</div>

<div class="MainDisplay">
    <Sidebar />
    <div>
        <Resize />
    </div>
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
        justify-content: space-between;
    }
</style>