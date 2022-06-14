import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import Drawer from './drawer/Drawer';
import UncontrolledDrawer from './drawer/UncontrolledDrawer';
import InputDatePicker from './form/fields/InputDatePicker';
import InputDateRangePicker from './form/fields/InputDateRangePicker';
import InputDateTimePicker from './form/fields/InputDateTimePicker';
import InputSelect from './form/fields/InputSelect';
import InputText from './form/fields/InputText';
import FormField from './form/FormField';
import { PageBloc, PageBlocColumn } from './layout/PageBloc';
import PageTitle from './layout/PageTitle';
import { Panel, PanelSeparator } from './layout/Panel';
import StatusDot from './layout/StatusDot';
import MultipleChoiceFilterMenu, { MultipleChoiceObjectFilterMenu } from './list/filter/MultipleChoiceFilterMenu';
import SingleChoiceFilterMenu, { SingleObjectChoiceFilterMenu } from './list/filter/SingleChoiceFilterMenu';
import { ListElements, ListSingleElement } from './list/ListElements';
import ListHeader from './list/ListHeader';
import SearchBar from './list/search/SearchBar';
import SortMenu from './list/sort/SortMenu';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';

export default class AdminTheme implements PlumeAdminTheme {
  pageTitle = PageTitle;

  pageBloc = PageBloc;

  pageBlocColumn = PageBlocColumn;

  actionsContainer = ActionsContainer;

  actionButton = ActionButton;

  actionLink = ActionLink;

  panel = Panel;

  panelSeparator = PanelSeparator;

  searchBar = SearchBar;

  sortMenu = SortMenu;

  multipleChoiceFilterMenu = MultipleChoiceFilterMenu;

  multipleChoiceObjectFilterMenu = MultipleChoiceObjectFilterMenu;

  singleChoiceFilterMenu = SingleChoiceFilterMenu;

  singleChoiceObjectFilterMenu = SingleObjectChoiceFilterMenu;

  listHeader = ListHeader;

  listElements = ListElements;

  listSingleElement = ListSingleElement;

  statusDot = StatusDot;

  popin = Popin;

  popinCloseWithoutSaving = PopinCloseWithoutSaving;

  drawer = Drawer;

  uncontrolledDrawer = UncontrolledDrawer;

  formField = FormField;

  inputText = InputText;

  inputSelect = InputSelect;

  inputDate = InputDatePicker;

  inputDateTime = InputDateTimePicker;

  inputDateRange = InputDateRangePicker;
}
