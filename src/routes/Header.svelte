<script>
	let logo = "images/UNMCLogo.svg";
	import Resize, { saveAsPDF } from "./Resize.svelte";
</script>

<header>
	<div class="corner"></div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>

		<p>Welcome to Beyond Words!</p>

		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<button on:click={saveAsPDF}> Print </button>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(171, 25, 25, 0.779);/*var(--background);*/
		height: 8vh; /* 8% of the viewport height */
		width: 85%; /* 100% of the viewport width */
		margin-left: auto;
	}
	button {
		background-color: rgba(156, 45, 51, 1);
		color: white;
	}
	.corner {
		width: 3em;
		height: 3em;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
		padding: 0 0.5rem;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
		--unmc_color: rgba(156, 45, 51, 1);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
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
