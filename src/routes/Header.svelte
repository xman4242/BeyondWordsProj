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
		background-color: rgba(156, 45, 51, 1);
		color: white;
	}
	.corner {
		width: 3em;
		height: 3em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
		--unmc_color: rgba(156, 45, 51, 1);
	}

	path {
		fill: var(--unmc_color);
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

	img {
		padding: 0 0.5rem;
		display: flex;
		height: 100%;
		align-items: center;
	}
</style>
