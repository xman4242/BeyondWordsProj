<script>
    import Canvas from "./Canvas.svelte";
    import Header from "./Header.svelte";
    import Sidebar from "./Sidebar.svelte";
</script>



<Header />
<Sidebar />
<div>
    <Canvas />
</div>


<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
</style>