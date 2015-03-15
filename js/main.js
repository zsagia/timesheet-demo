YUI.add('timesheet', function (A, NAME) {

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

 	DataTypeDate = A.DataType.Date,
	DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

	_DOT = '.',
	_EMPTY_STR = '',
	_SPACE = ' ',

	TIMESHEET = "timesheet",
	TIMESHEET_BASE = "timesheet-base",
	TIMESHEET_DAY = "timesheet-day",
	TIMESHEET_DAYS = "timesheet-days",
	TIMESHEET_VIEW_MONTH = "timesheet-view-month",
	TIMESHEET_VIEW = 'timesheet-view',

	ACTIVE = 'active',
	ACTIVE_VIEW = 'activeView',
	ALL = 'all',
	BTN = 'btn',
    BUTTON = 'button',
	CHEVRON = 'chevron',
	COLGRID = 'colgrid',
	COLUMN = 'column',
    COLUMN_DAY_HEADER = 'columnDayHeader',
	COLUMN_HEADER_NODE = 'columnHeaderNode',
	COLUMN_ELEMENT_HEADER = 'columnElementHeader',
	COLUMN_TABLE_GRID = 'columnTableGrid',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTROLS = 'controls',
    CONTROLS_NODE = 'controlsNode',
    DATA = 'data',
	DATE = 'date',
	DAY = 'day',
	DISABLED = 'disabled',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
    DISPLAY_ROWS = 'displayRows',
    DIV = 'div',
	ELEMENT = 'element',
	FIRST = 'first',
	GRID = 'grid',
	HD = 'hd',
	HEADER = 'header',
    HEADER_DATE_FORMATTER = 'headerDateFormatter',
    HEADER_NODE = 'headerNode',
	HEADER_TABLE_NODE = 'headerTableNode',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
    ICON_PREV_NODE = 'iconPrevNode',
    ICONS = 'icons',
    LEFT = 'left',
	LOCALE = 'locale',
    NAME = 'name',
	NAV = 'nav',
	NAV_NODE = 'navNode',
    NAVIGATION_DATE_FORMATTER = 'navigationDateFormatter',
	NEXT = 'next',
    NEXT_DATE = 'nextDate',
	NOSCROLL = 'noscroll',
	MEETING = 'meeting',
	MONTH = 'month',
	PAST = 'past',
	PREV = 'prev',
    PREV_DATE = 'prevDate',
	RENDERED = 'rendered',
	REMINDER = 'reminder',
	REPEATED = 'repeated',
	RIGHT = 'right',
	ROW = 'row',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SCROLLABLE = 'scrollable',
	SHORT = 'short',
	TABLE = 'table',
	TABLE_GRID_NODE = 'tableGridNode',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TABLE_ROWS = 'tableRows',
    TBODY = 'tbody',
	TITLE = 'title',
	TIMESHEET_EVENT = 'TIMESHEET-event',
	TODAY = 'today',
	TODAY_NODE = 'todayNode',
    TODAY_DATE = 'todayDate',
	TR = 'tr',
    TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEW_DATE = 'viewDate',
	VIEW_DATE_NODE = 'viewDateNode',
	VIEW_STACK = 'viewStack',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',
    WEEKEND = 'weekend',

    getNodeListHTMLParser = function(selector, sizeCondition) {
           return function(srcNode) {
              var nodes = srcNode.all(selector);
              return (nodes.size() >= sizeCondition) ? nodes : null;
           };
    },

    isModelList = function(val) {
           return val instanceof A.ModelList;
    },

	isTimesheetView = function(val) {
           return val instanceof A.TimesheetView;
    },

	getCN = A.ClassNameManager.getClassName,

    CSS_BTN = getCN(BTN),
	CSS_ICON = getCN(ICON),
    CSS_TIMESHEET_CONTROLS = getCN(TIMESHEET_BASE, CONTROLS),
    CSS_TIMESHEET_HD = getCN(TIMESHEET_BASE, HD),
    CSS_TIMESHEET_ICON_NEXT = getCN(TIMESHEET_BASE, ICON, NEXT),
    CSS_TIMESHEET_ICON_PREV = getCN(TIMESHEET_BASE, ICON, PREV),
    CSS_TIMESHEET_NAV = getCN(TIMESHEET_BASE, NAV),
    CSS_TIMESHEET_TODAY = getCN(TIMESHEET_BASE, TODAY),
    CSS_TIMESHEET_VIEW = getCN(TIMESHEET_BASE, VIEW),
    CSS_TIMESHEET_VIEW_ = getCN(TIMESHEET_BASE, VIEW, _EMPTY_STR),
    CSS_TIMESHEET_VIEW_DATE = getCN(TIMESHEET_BASE, VIEW, DATE),
    CSS_TIMESHEET_VIEW_NOSCROLL = getCN(TIMESHEET_VIEW, NOSCROLL),
    CSS_TIMESHEET_VIEW_SCROLLABLE = getCN(TIMESHEET_VIEW, SCROLLABLE),
    CSS_TIMESHEET_VIEW_SELECTED = getCN(ACTIVE),
    CSS_BTN = getCN(BTN),
    CSS_ICON_CHEVRON_RIGHT = "glyphicon glyphicon-chevron-right",
    CSS_ICON_CHEVRON_LEFT = "glyphicon glyphicon-chevron-left"
    CSS_TIMESHEET_VIEWS = getCN(TIMESHEET_BASE, VIEWS),

    CSS_TIMESHEET_EVENT = getCN(TIMESHEET_EVENT),
    CSS_TIMESHEET_EVENT_ALL_DAY = getCN(TIMESHEET_EVENT, ALL, DAY),
    CSS_TIMESHEET_EVENT_CONTENT = getCN(TIMESHEET_EVENT, CONTENT),
    CSS_TIMESHEET_EVENT_DISABLED = getCN(TIMESHEET_EVENT, DISABLED),
    CSS_TIMESHEET_EVENT_HIDDEN = getCN(TIMESHEET_EVENT, HIDDEN),
    CSS_TIMESHEET_EVENT_ICON_DISABLED = getCN(TIMESHEET_EVENT, ICON, DISABLED),
    CSS_TIMESHEET_EVENT_ICON_MEETING = getCN(TIMESHEET_EVENT, ICON, MEETING),
    CSS_TIMESHEET_EVENT_ICON_REMINDER = getCN(TIMESHEET_EVENT, ICON, REMINDER),
    CSS_TIMESHEET_EVENT_ICON_REPEATED = getCN(TIMESHEET_EVENT, ICON, REPEATED),
    CSS_TIMESHEET_EVENT_ICONS = getCN(TIMESHEET_EVENT, ICONS),
    CSS_TIMESHEET_EVENT_MEETING = getCN(TIMESHEET_EVENT, MEETING),
    CSS_TIMESHEET_EVENT_PAST = getCN(TIMESHEET_EVENT, PAST),
    CSS_TIMESHEET_EVENT_REMINDER = getCN(TIMESHEET_EVENT, REMINDER),
    CSS_TIMESHEET_EVENT_REPEATED = getCN(TIMESHEET_EVENT, REPEATED),
    CSS_TIMESHEET_EVENT_SHORT = getCN(TIMESHEET_EVENT, SHORT),
    CSS_TIMESHEET_EVENT_TITLE = getCN(TIMESHEET_EVENT, TITLE),
	CSS_TVT_COLGRID = getCN(TIMESHEET_VIEW, TABLE, COLGRID),
	CSS_TVT_COLGRID_FIRST = getCN(TIMESHEET_VIEW, TABLE, COLGRID, FIRST),
    CSS_TVT_COLGRID_TODAY = getCN(TIMESHEET_VIEW, TABLE, COLGRID, TODAY),
	CSS_TVT_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, CONTAINER),
	CSS_TVT_HEADER_ELEMENT = getCN(TIMESHEET_VIEW, TABLE, HEADER, ELEMENT),
	CSS_TVT_HEADER_TABLE = getCN(TIMESHEET_VIEW, TABLE, HEADER, TABLE),
	CSS_TVT_HEADER_COLUMN = getCN(TIMESHEET_VIEW, TABLE, HEADER, COLUMN),
	CSS_TVT_ROW = getCN(TIMESHEET_VIEW, TABLE, ROW),
    CSS_TVT_ROW_TODAY = getCN(TIMESHEET_VIEW, TABLE, ROW, TODAY),
    CSS_TVT_ROW_WEEKEND = getCN(TIMESHEET_VIEW, TABLE, ROW, WEEKEND),
	CSS_TVT_ROW_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, ROW, CONTAINER),
    CSS_TVT_TABLE_DATA = getCN(TIMESHEET_VIEW, TABLE, DATA),
    CSS_TVT_TABLE_DATA_COLUMN = getCN(TIMESHEET_VIEW, TABLE, DATA, COLUMN),
    CSS_TVT_TABLE_DATA_FIRST = getCN(TIMESHEET_VIEW, TABLE, DATA, FIRST),
	CSS_TVT_TABLE_GRID = getCN(TIMESHEET_VIEW, TABLE, GRID),
	CSS_TVT_TABLE_GRID_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, GRID, CONTAINER),
	CSS_TVT_TABLE_GRID_FIRST = getCN(TIMESHEET_VIEW, TABLE, GRID, FIRST),

	TPL_TVT_CONTAINER = '<div class="' + CSS_TVT_CONTAINER + '">' +
           '<div class="' + CSS_TVT_ROW_CONTAINER + '"></div>' +
           '</div>',
    TPL_TVT_GRID_COLUMN = '<td class="' + CSS_TVT_COLGRID + '">&nbsp;</td>',
	TPL_TVT_HEADER_ELEMENT = '<th class="' + CSS_TVT_HEADER_ELEMENT + '"><div>&nbsp;</div></th>',
	TPL_TVT_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_HEADER_TABLE + '">' +
           '<tbody>' +
           '<tr class="' + CSS_TVT_HEADER_COLUMN + '"></tr>' +
           '</tbody>' +
           '</table>',
    TPL_TVT_ROW = '<div class="' + CSS_TVT_ROW + '"></div>',
    TPL_TVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_TABLE_DATA + '">' +
           '<tbody></tbody>' +
           '</table>',
    TPL_TVT_TABLE_DATA_COLUMN = '<td class="' + CSS_TVT_TABLE_DATA_COLUMN + '"><div></div></td>',
    TPL_TVT_TABLE_DATA_ROW = '<tr></tr>',
    TPL_TVT_TABLE_GRID = '<div class="' + CSS_TVT_TABLE_GRID_CONTAINER + '">' +
           '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_TABLE_GRID + '">' +
           '<tbody>' +
           '<tr></tr>' +
           '</tbody>' +
           '</table></div>',
    TPL_TIMESHEET_CONTROLS = '<div class="span7 ' + CSS_TIMESHEET_CONTROLS + '"></div>',
    TPL_TIMESHEET_HD = '<div class="row-fluid ' + CSS_TIMESHEET_HD + '"></div>',
    TPL_TIMESHEET_ICON_NEXT = '<button type="button" class="' + [CSS_TIMESHEET_ICON_NEXT, "btn btn-default"].join(_SPACE) +
           '"><i class="' + CSS_ICON_CHEVRON_RIGHT + '"></i></button>',
    TPL_TIMESHEET_ICON_PREV = '<button type="button" class="' + [CSS_TIMESHEET_ICON_PREV, "btn btn-default"].join(_SPACE) +
           '"><i class="' + CSS_ICON_CHEVRON_LEFT + '"></i></button>',
    TPL_TIMESHEET_NAV = '<div class="btn-group"></div>',
    TPL_TIMESHEET_TODAY = '<button type="button" class="' + [CSS_TIMESHEET_TODAY, 'btn btn-default'].join(_SPACE) +
           '">{today}</button>',
    TPL_TIMESHEET_VIEW = '<button type="button" class="' + [CSS_TIMESHEET_VIEW, CSS_TIMESHEET_VIEW_, "btn"].join(_SPACE) +
           '{name}" data-view-name="{name}">{label}</button>',
    TPL_TIMESHEET_VIEW_DATE = '<span class="' + CSS_TIMESHEET_VIEW_DATE + '"></span>',
    TPL_TIMESHEET_VIEWS = '<div class="span5 ' + CSS_TIMESHEET_VIEWS + '"></div>';
var TimesheetDay = A.Component.create({
	NAME: TIMESHEET_DAY,

	ATTRS: {
           endDate: {
              validator: isDate
           },

		endTime: {
			validator: isNumber
		},

		lunchTime: {
			validator: isNumber
		},

           startDate: {
              validator: isDate
           },

		startTime: {
			validator: isNumber
		},

		userId: {
              validator: isString
		},

           userName: {
              validator: isString
           }
	},

	EXTENDS: A.Model
});

A.TimesheetDay = TimesheetDay;
}, '0.0.1', {
	"requires": ["aui-button", "aui-datatype", "aui-component", "aui-node-base", "model", "model-list", "widget-stdmod"], "skinnable": true
});