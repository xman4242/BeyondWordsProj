<script>
	let logo = "images/UNMCLogo.svg";
	import Resize, { saveAsPDF } from "./Resize.svelte";
</script>

<header>
	<div class="corner"></div>
	<p class="title">Welcome to Beyond Words!</p>
	<div class="corner">
		<button on:click={saveAsPDF}> Print </button>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(171, 25, 25, 0.779); /*var(--background);*/
		height: 8vh; /* 8% of the viewport height */
		width: 85%; /* 100% of the viewport width */
		margin-left: auto;
	}
	.title {
		font-size: 1.5em;
		color: #FDFFFC;
	}
	button {
		background-color: rgba(171, 25, 25, 0.779);
		color: #FDFFFC;
		border: none;
		font-size: 1.2em;
	}
	.corner {
		padding-right: 20px;
	}

	p {
		font-weight: bold;
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--unmc_color);
		background-size: contain;
	}
</style>
