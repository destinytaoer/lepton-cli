import a from './add';

export default function core(argv: any) {
  a()
  console.log('argv', argv);
}
