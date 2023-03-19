export function init(projectName: string, cmd: any) {
  console.log('init', projectName, cmd.force, process.env.CLI_TARGET_PATH)
}
