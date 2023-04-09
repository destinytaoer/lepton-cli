function init(projectName, cmd) {
    console.log('init', projectName, cmd.force, process.env.CLI_TARGET_PATH);
}

export { init as default };
