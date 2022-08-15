const RenderMFE = async (name: string, host: string) => {
	const scriptId = `micro-frontend-script-${name}`;
	const renderMicroFrontend = () => {
		(window as { [key: string]: any })[`render${name}`] &&
			(window as { [key: string]: any })[`render${name}`](`${name}-container`);
	};

	if (document.getElementById(scriptId)) {
		renderMicroFrontend();
		return;
	}

	await fetch(`${host}/asset-manifest.json`)
		.then((res) => res.json())
		.then((manifest) => {
			const promises = Object.keys(manifest['files'])
				.filter((key) => key.endsWith('.js'))
				.reduce((sum, key) => {
					sum.push(
						new Promise((resolve) => {
							const path = `${host}${manifest['files'][key]}`;
							const script = document.createElement('script');
							if (key === 'main.js') {
								script.id = scriptId;
							}
							script.onload = () => {
								resolve();
							};
							script.src = path;
							document.body.after(script);
						})
					);
					return sum;
				}, []);

			Promise.allSettled(promises).then(() => {
				renderMicroFrontend();
			});
		});
};
export { RenderMFE };
