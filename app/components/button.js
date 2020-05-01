import Component from '@glimmer/component';

const RED =
  'bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red active:bg-red-700';
const BLUE =
  'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700';
const GREEN =
  'bg-green-600 hover:bg-green-500 focus:border-green-700 focus:shadow-outline-green active:bg-green-700';

export default class extends Component {
  get colorClassName() {
    switch (this.args.color) {
      case 'red':
        return RED;
      case 'green':
        return GREEN;
      default:
        return BLUE;
    }
  }
}
