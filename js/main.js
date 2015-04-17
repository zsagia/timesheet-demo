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

	BASE_WORK_TIME_VALUE = 28800000,

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
	BASE_WORK_TIME = 'baseWorkTime',
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
	CSS_TIMESHEET_VIEW_COLUMN_DATA = getCN(TIMESHEET_BASE, VIEW, COLUMN, DATA),
	CSS_TIMESHEET_VIEW_DATE = getCN(TIMESHEET_BASE, VIEW, DATE),
	CSS_TIMESHEET_VIEW_NOSCROLL = getCN(TIMESHEET_VIEW, NOSCROLL),
	CSS_TIMESHEET_VIEW_SCROLLABLE = getCN(TIMESHEET_VIEW, SCROLLABLE),
	CSS_TIMESHEET_VIEW_SELECTED = getCN(ACTIVE),
	CSS_BTN = getCN(BTN),
	CSS_ICON_CHEVRON_RIGHT = "glyphicon glyphicon-chevron-right",
	CSS_ICON_CHEVRON_LEFT = "glyphicon glyphicon-chevron-left",
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

	TPL_BODY_CONTENT = '<input type="hidden" name="startDate" value="{startDate}" />' +
		'<input type="hidden" name="endDate" value="{endDate}" />'
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
	TPL_TIMESHEET_VIEW_COLUMN_DATA = '<span class="' + CSS_TIMESHEET_VIEW_COLUMN_DATA + '"></span>',
	TPL_TIMESHEET_VIEW_COLUMN_DATA_EDITOR = '<input placeholder="hh:mm" />',
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

A.TimesheetDays = A.Base.create(TIMESHEET_DAYS, A.ModelList, [], {
	model: A.TimesheetDay
}, {
    ATTRS: {
        timesheet: {}
    }
});

var TimesheetDaySupport = function() {};

TimesheetDaySupport.ATTRS = {};

A.mix(TimesheetDaySupport.prototype, {
	dayModel: A.TimesheetDay,
	daysModel: A.TimesheetDays,

	initializer: function(config) {
		var instance = this;
		
		instance._timesheetDaysAsObject = {};

		instance._timesheetDays = new instance.daysModel({
			after: {
				add: A.bind(instance._afterAddTimesheetDay, instance)
			},
			bubbleTargets: instance,
			originalItems: [],
			TIMESHEET: instance
		});
		
		instance.addTimesheetDays(config.items || config.timesheetDays)
	},
	
	addTimesheetDays: function(model) {
		var instance = this,
			timesheetDays = instance._toTimesheetDays(model);

		return instance._timesheetDays.add(timesheetDays);
	},

	calculateAllTime: function(timesheetDay) {
		var instance = this;

		return timesheetDay.get('endTime') - timesheetDay.get('startTime');
	},

	calculateOverTime: function(timesheetDay) {
		var instance = this;

		return instance.calculateWorkTime(timesheetDay) - instance.get(BASE_WORK_TIME);
	},

	calculateWorkTime: function(timesheetDay) {
		var instance = this;

		return timesheetDay.get('endTime') - timesheetDay.get('startTime') - timesheetDay.get('lunchTime');
	},

	getTimesheetDays: function(filterFn, skipSort) {
		var instance = this,
			timesheetDays = instance._timesheetDays;

		if (!skipSort) {
			timesheetDays.sort({
				silent: true
			});
		}

		if (filterFn) {
			timesheetDays = timesheetDays.filter(filterFn);
		}
		else {
			timesheetDays = timesheetDays.toArray();
		}

		return timesheetDays;
	},

	_afterAddTimesheetDay: function(event) {
		var instance = this,
			timesheetDay = event.model,
			timesheetDaysAsObject = instance._timesheetDaysAsObject,
			startDate, endDate;

		endDate = new Date(timesheetDay.get('endTime'));
		timesheetDay.set('endDate', endDate);

		startDate = new Date(timesheetDay.get('startTime'));
		timesheetDay.set('startDate', startDate);

		timesheetDay.set(TIMESHEET, instance);

		timesheetDaysAsObject[String((DateMath.toMidnight(DateMath.clone(startDate))).getTime())] = timesheetDay;
	},

	_toTimesheetDays: function(values) {
		var instance = this,
			timesheetDays = [];

		if (isModelList(values)) {
			timesheetDays = values.toArray();
			values.set(TIMESHEET, instance);
		}
		else if (isArray(values)) {
			A.Array.each(values, function(value) {
				if (isModelList(value)) {
					timesheetDays = timesheetDays.concat(value.toArray());
					value.set(TIMESHEET, instance);
				}
				else {
					timesheetDays.push(value);
				}
			});
		}
		else {
			timesheetDays = values;
		}

		return timesheetDays;
	} 
});

A.TimesheetDaySupport = TimesheetDaySupport;

var TimesheetBase =  A.Component.create({
	NAME: TIMESHEET_BASE,

	ATTRS: {
		activeView: {
			validator: isTimesheetView
		},

		baseWorkTime: {
			value: BASE_WORK_TIME_VALUE,
			validator: isNumber
		},

		controlsNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_CONTROLS);
			}
		},

		date: {
			value: new Date(),
			validator: isDate
		},

		firstDayOfWeek: {
			value: 0,
			validator: isNumber
		},

		headerNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_HD);
			}
		},

		iconNextNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_ICON_NEXT);
			}
		},

		iconPrevNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_ICON_PREV);
			}
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;

				return A.DataType.Date.format(
					date, {
						format: '%B %d, %Y',
						locale: instance.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		navNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_NAV);
			}
		},

		strings: {
			value: {
				day: 'Day',
				month: 'Month',
				today: 'Today',
				week: 'Week',
				year: 'Year'
			}
		},

		todayDate: {
			value: new Date(),
			validator: isDate
		},

		todayNode: {
			valueFn: function() {
				return A.Node.create(
					this._processTemplate(TPL_TIMESHEET_TODAY)
				);
			}
		},

		viewsNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_VIEWS);
			}
		},

		viewDate: {
			getter: '_getViewDate',
			readOnly: true
		},

		viewDateNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIMESHEET_VIEW_DATE);
			}
		},

		views: {
			setter: '_setViews',
			value: []
		}
	},

	HTML_PARSER: {
		controlsNode: _DOT + CSS_TIMESHEET_CONTROLS,
		viewDateNode: _DOT + CSS_TIMESHEET_VIEW_DATE,
		headerNode: _DOT + CSS_TIMESHEET_HD,
		iconNextNode: _DOT + CSS_TIMESHEET_ICON_NEXT,
		iconPrevNode: _DOT + CSS_TIMESHEET_ICON_PREV,
		navNode: _DOT + CSS_TIMESHEET_NAV,
		todayNode: _DOT + CSS_TIMESHEET_TODAY,
		viewsNode: _DOT + CSS_TIMESHEET_VIEWS
	},

	UI_ATTRS: [DATE, ACTIVE_VIEW],

	AUGMENTS: [A.TimesheetDaySupport, A.WidgetStdMod],

	prototype: {
		/**
		* TimesheetBase
		*/
		initializer: function() {
			var instance = this;

			instance[VIEW_STACK] = {};

			instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
			instance[VIEW_DATE_NODE] = instance.get(VIEW_DATE_NODE);
			instance[HEADER] = instance.get(HEADER_NODE);
			instance[ICON_NEXT_NODE] = instance.get(ICON_NEXT_NODE);
			instance[ICON_PREV_NODE] = instance.get(ICON_PREV_NODE);
			instance[NAV_NODE] = instance.get(NAV_NODE);
			instance[TODAY_NODE] = instance.get(TODAY_NODE);
			instance[VIEWS_NODE] = instance.get(VIEWS_NODE);

			instance.after({
				activeViewChange: instance._afterActiveViewChange,
				render: instance._afterRender
			});

			this.publish({
				viewTimesheetDays: {
				defaultFn: this._viewTimesheetDaysFn
				}
			});
		},

		/**
		* TimesheetBase
		*/
		bindUI: function() {
			var instance = this;

			instance._bindDelegate();
		},

		/**
		* TimesheetBase
		*/
		viewTimesheetDays: function(view) {
			var instance = this;

			view.viewTimesheetDays(
				instance.getTimesheetDays()
			);
		},

		/**
		* TimesheetBase
		*/
		renderButtonGroup: function() {
			var instance = this;

			instance.buttonGroup = new A.ButtonGroup({
				boundingBox: instance[VIEWS_NODE],
				on: {
					selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
				}
			}).render();
		},

		/**
		* TimesheetBase
		*/
		renderView: function(view) {
			var instance = this;

			if (view) {
				view.show();

				if (!view.get(RENDERED)) {
					if (!instance.bodyNode) {
							instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR);
					}

					view.render(instance.bodyNode);
				}
			}
		},

		/**
		* TimesheetBase
		*/
		syncStdContent: function() {
			var instance = this;
			var views = instance.get(VIEWS);

			instance[NAV_NODE].append(instance[ICON_PREV_NODE]);
			instance[NAV_NODE].append(instance[ICON_NEXT_NODE]);

			instance[CONTROLS_NODE].append(instance[TODAY_NODE]);
			instance[CONTROLS_NODE].append(instance[NAV_NODE]);
			instance[CONTROLS_NODE].append(instance[VIEW_DATE_NODE]);

			A.Array.each(views, function(view) {
					instance[VIEWS_NODE].append(instance._createViewTriggerNode(view));
			});

			instance[HEADER].append(instance[CONTROLS_NODE]);
			instance[HEADER].append(instance[VIEWS_NODE]);

			instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
		},

		/**
		* TimesheetBase
		*/
		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		/**
		* TimesheetBase
		*/
		_afterActiveViewChange: function(event) {
			var instance = this;

			if (instance.get(RENDERED)) {
				var activeView = event.newVal;
				var lastActiveView = event.prevVal;

				if (lastActiveView) {
					lastActiveView.hide();
				}

				instance.renderView(activeView);

				var eventRecorder = instance.get(EVENT_RECORDER);

				if (eventRecorder) {
					eventRecorder.hidePopover();
				}

				instance._uiSetDate(instance.get(DATE));
			}
		},

		/**
		* TimesheetBase
		*/
		_afterRender: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			instance.renderView(activeView);
			instance.renderButtonGroup();

			instance._uiSetDate(instance.get(DATE));
			instance._uiSetActiveView(activeView);
		 },

		/**
		* TimesheetBase
		*/
		_bindDelegate: function() {
			var instance = this;

			instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, _DOT + CSS_TIMESHEET_ICON_PREV,
				instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, _DOT + CSS_TIMESHEET_ICON_NEXT,
				instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickToday, _DOT + CSS_TIMESHEET_TODAY, instance);
		},

		/**
		* TimesheetBase
		*/
	 	_createViewTriggerNode: function(view) {
			var instance = this;

			if (!view.get(TRIGGER_NODE)) {
				var name = view.get(NAME);

				view.set(
					TRIGGER_NODE,
					A.Node.create(
							Lang.sub(TPL_TIMESHEET_VIEW, {
									 name: name,
									 label: (instance.getString(name) || name)
							})
					)
				);
			}

			return view.get(TRIGGER_NODE);
		},

		/**
		* TimesheetBase
		*/
		_viewTimesheetDaysFn: function() {
			this.viewTimesheetDays(this.get('activeView'));
		},

		/**
		* TimesheetBase
		*/
		_getViewDate: function() {
			var instance = this,
				date = instance.get(DATE),
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
					date = activeView.getAdjustedViewDate(date);
			}

			return date;
		},

		/**
		* TimesheetBase
		*/
		_onButtonGroupSelectionChange: function(event) {
			var instance = this,
				viewName = event.originEvent.target.attr(DATA_VIEW_NAME);

			//instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));

			event.preventDefault();
		},

		/**
		* TimesheetBase
		*/
		_onClickToday: function(event) {
		var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, instance.get(TODAY_DATE));
			}

			event.preventDefault();
		},

		/**
		* TimesheetBase
		*/
		_onClickNextIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(NEXT_DATE));
			}

			event.preventDefault();
		},

		/**
		* TimesheetBase
		*/
		_onClickPrevIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(PREV_DATE));
			}

			event.preventDefault();
		},

		/**
		* TimesheetBase
		*/
		_processTemplate: function(tpl) {
			var instance = this;

			return Lang.sub(tpl, instance.getStrings());
		},

		/**
		* TimesheetBase
		*/
		_setViews: function(val) {
			var instance = this;
			var views = [];

			A.Array.each(val, function(view) {
				if (isTimesheetView(view) && !view.get(RENDERED)) {
						view.setAttrs({
						timesheet: instance
					});

					views.push(view);

					instance[VIEW_STACK][view.get(NAME)] = view;
				}
			});

			if (!instance.get(ACTIVE_VIEW)) {
					instance.set(ACTIVE_VIEW, val[0]);
			}

			return views;
		},

		/**
		* TimesheetBase
		*/
		_uiSetActiveView: function(val) {
			var instance = this;

			if (val) {
				var activeView = val.get(NAME),
					activeNav = instance[VIEWS_NODE].one(_DOT + CSS_TIMESHEET_VIEW_ + activeView);

				if (activeNav) {
					instance[VIEWS_NODE].all(BUTTON).removeClass(CSS_TIMESHEET_VIEW_SELECTED);
					activeNav.addClass(CSS_TIMESHEET_VIEW_SELECTED);
				}
			}
		},

		/**
		* TimesheetBase
		*/
		_uiSetDate: function(val) {
			var instance = this,
				formatter = instance.get(NAVIGATION_DATE_FORMATTER),
				navigationTitle = formatter.call(instance, val);

			if (instance.get(RENDERED)) {
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					activeView._uiSetDate(val);

					formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
					navigationTitle = formatter.call(activeView, val);
				}

				instance[VIEW_DATE_NODE].html(navigationTitle);
			}
		}
	}

});

A.Timesheet = TimesheetBase;

var TimesheetView = A.Component.create({
	NAME: TIMESHEET_VIEW,

	ATTRS: {
		bodyContent: {
				value: _EMPTY_STR
		 },

		 height: {
				value: 1000
		},

		name: {
			value: _EMPTY_STR,
			validator: isString
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(date, {
					format: '%A, %d %B, %Y',
					locale: timesheet.get(LOCALE)
				});
			},
			validator: isFunction
	 	},

		nextDate: {
			getter: 'getNextDate',
			readOnly: true
		},

		prevDate: {
			getter: 'getPrevDate',
			readOnly: true
		},

		scrollable: {
			value: true,
			validator: isBoolean
		},

		timesheet: {
			lazyAdd: false,
			setter: '_setTimesheet'
		},
	},

	AUGMENTS: [A.WidgetStdMod],

	BIND_UI_ATTRS: [SCROLLABLE],

	prototype: {
		/**
		* TimesheetView
		*/
		initializer: function() {
			var instance = this;

			instance.after('render', instance._afterRender);
		},

		/**
		* TimesheetView
		*/
		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		/**
		* TimesheetView
		*/
		flushViewCache: function() {},

		/**
		* TimesheetView
		*/
		getNextDate: function() {},

		/**
		* TimesheetView
		*/
		getPrevDate: function() {},

		/**
		* TimesheetView
		*/
		getToday: function() {
			return DateMath.toMidnight(new Date());
		},

		/**
		* TimesheetView
		*/
		syncStdContent: function() {},

		/**
		* TimesheetView
		*/
		syncEventUI: function(timesheetDay) {},

		/**
		* TimesheetView
		*/
	 	_afterRender: function(event) {
			var instance = this;

			instance._uiSetScrollable(
					instance.get(SCROLLABLE)
			);
		},

		/**
		* TimesheetView
		*/
		_uiSetDate: function(val) {},

		/**
		* TimesheetView
		*/
		_uiSetScrollable: function(val) {
			var instance = this;
			var bodyNode = instance.bodyNode;

			if (bodyNode) {
				bodyNode.toggleClass(CSS_TIMESHEET_VIEW_SCROLLABLE, val);
				bodyNode.toggleClass(CSS_TIMESHEET_VIEW_NOSCROLL, !val);
			}
		},

		/**
		* TimesheetView
		*/
		_setTimesheet: function(timesheet) {
			var instance = this;
			var oldTimesheet = instance.get(TIMESHEET);

			if (oldTimesheet) {
					instance.removeTarget(oldTimesheet);
			}

			if (timesheet) {
				instance.addTarget(timesheet);

				timesheet.after(['*:add', '*:remove', '*:reset'], A.bind(instance.flushViewCache, instance));
			}

			return timesheet;
		}
	}
});

A.TimesheetView = TimesheetView;

var TimesheetMonthView = A.Component.create({

	NAME: TIMESHEET_VIEW_MONTH,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		name: {
			value: MONTH
		},

		columnHeaderNode: {
			valueFn: '_valueColumnHeaderNode'
		},

		headerElements: {
			value: [],
			validator: isArray
		},

		headerDateFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(
					date, {
						format: '%d. %A',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		rowDateFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(
					date, {
						format: '%X',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_TVT_HEADER_TABLE);
			}
		},

		hourMinutesFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(
					date, {
						format: '%Ih:%Mm',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return DataTypeDate.format(
					date, {
						format: '%B %Y',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		rowsContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_TVT_CONTAINER);
			}
		},

		scrollable: {
			value: false
		},

		strings: {
			value: {
				close: 'Close',
				show: 'Show',
				more: 'more'
			}
		},

		today: {
			value: new Date()
		}
	},

	HTML_PARSER: {
		headerElements: getNodeListHTMLParser(_DOT + CSS_TVT_HEADER_COLUMN, 7),
		headerTableNode: _DOT + CSS_TVT_HEADER_TABLE,
		rowsContainerNode: _DOT + CSS_TVT_CONTAINER
	},

	EXTENDS: A.TimesheetView,

	prototype: {
		timesheetDayDateStack: null,
		timesheetDayRowStack: null,
		rowDataTableStack: null,

		/**
		* TimesheetMonthView
		*/
		initializer: function() {
			var instance = this;

			instance.timesheetDayDateStack = {};
			instance.timesheetDayRowStack = {};
			instance.rowDataTableStack = {};

			instance[COLUMN_HEADER_NODE] = instance.get(COLUMN_HEADER_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[ROWS_CONTAINER_NODE] = instance.get(ROWS_CONTAINER_NODE);
			instance[COLUMN_ELEMENT_HEADER] = instance.headerTableNode.one(_DOT + CSS_TVT_HEADER_COLUMN);
			instance[COLUMN_TABLE_GRID] = A.NodeList.create();
			instance[TABLE_ROW_CONTAINER] = instance[ROWS_CONTAINER_NODE].one(_DOT + CSS_TVT_ROW_CONTAINER);
		},

		/**
		* TimesheetMonthView
		*/
		renderUI: function() {
			var instance = this;

			instance[COLUMN_HEADER_NODE].appendTo(instance[COLUMN_ELEMENT_HEADER]);
		},

		// This is not necesseraly
		/**
		* TimesheetMonthView
		*/
		buildEventsRow: function(rowStartDate, rowEndDate) {
			var instance = this;
			var displayRows = instance.get(DISPLAY_ROWS);

			var rowRenderedColumns = 0;
			//var rowNode = A.Node.create(TPL_TVT_TABLE_DATA_ROW);

			var timesheet = instance.get('timesheet');

			var timesheetDaysAsObject = timesheet._timesheetDaysAsObject;

			instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
				var timesheetDay = timesheetDaysAsObject[rowStartDate.getDate()];

				//instance._syncTimesheetDayNodeUI(timesheetDay, timesheetDayColNode, celDate);

				rowRenderedColumns++;
			});

			return rowNode;
		},

		/**
		* TimesheetMonthView
		*/
		buildTimesheetDay: function(timesheetDay) {
			var instance = this,
				cacheKey = String(timesheetDay.get('startTime')),
				rowDataTableNode = instance.rowDataTableStack[cacheKey];

			if (!rowDataTableNode) {
				rowDataTableNode = A.Node.create(TPL_TVT_TABLE_DATA);

				var tableBody = rowDataTableNode.one(TBODY);

				instance.rowDataTableStack[cacheKey] = rowDataTableNode;
			}

			return rowDataTableNode;
		},

		/**
		* TimesheetMonthView
		*/
		buildGridRowNode: function(celDate, index) {
			var instance = this,
				tableGridNode = instance._getTableGridNode(celDate, index),
				rowNode = A.Node.create(TPL_TVT_ROW);

			rowNode.append(tableGridNode);

			return rowNode;
		},

		/**
		* TimesheetMonthView
		*/
		getAdjustedViewDate: function(val) {
			var instance = this;

			return DateMath.toMidnight(DateMath.findMonthStart(val));
		},

		/**
		* TimesheetMonthView
		*/
		getNextDate: function() {
			var instance = this,
				timesheet = instance.get(TIMESHEET),
				viewDate = timesheet.get(VIEW_DATE);

			return DateMath.toLastHour(DateMath.add(viewDate, DateMath.MONTH, 1));
		},

		/**
		* TimesheetMonthView
		*/
		getPrevDate: function() {
			var instance = this;

			var timesheet = instance.get(TIMESHEET);
			var viewDate = timesheet.get(VIEW_DATE);

			return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.MONTH, 1));
		},

		/**
		* TimesheetMonthView
		*/
		getRowsNumber: function() {
			var instance = this,
				intervalStartDate = instance._findCurrentIntervalStart(),
				startDateRef = DateMath.safeClearTime(intervalStartDate),
				rowEndDate = DateMath.safeClearTime(DateMath.findMonthEnd(startDateRef));

			return rowEndDate.getDate();
		},

		/**
		* TimesheetMonthView
		*/
		loopDates: function(startDate, endDate, fn) {
			var instance = this;
			var curDate = DateMath.clone(startDate);
			var endDateMs = endDate.getTime();
			var index;

			for (index = 0; curDate.getTime() <= endDateMs; index++) {
				fn.apply(instance, [curDate, index]);

				curDate = DateMath.add(curDate, DateMath.DAY, 1);
			}
		},

		/**
		* TimesheetMonthView
		*/
		viewTimesheetDays: function(timesheetDays) {
			var instance = this;
			var intervalStartDate = instance._findCurrentIntervalStart();
			var startDateRef = DateMath.safeClearTime(intervalStartDate);
			var timesheet = instance.get(TIMESHEET);
			var viewDate = timesheet.get(VIEW_DATE);

			var monthEnd = DateMath.findMonthEnd(viewDate);
			var monthStart = DateMath.findMonthStart(viewDate);

			instance.flushViewCache();

			instance.bodyNode.all(_DOT + CSS_TVT_TABLE_DATA).remove();

			instance[TABLE_ROWS].each(function(rowNode, index) {
				var rowStartDate = DateMath.add(monthStart, DateMath.DAY, index);
				var rowEndDate = DateMath.add(monthStart, DateMath.DAY, index + 1);
				var timesheet = instance.get(TIMESHEET);

				var timesheetDay = timesheet._timesheetDaysAsObject[String(rowStartDate.getTime())];

				instance._buildTimesheetDay(timesheetDay, index);

				rowNode.delegate('click', function(event) {
					var columnNode = event.currentTarget,
						node = A.Node.create(TPL_TIMESHEET_VIEW_COLUMN_DATA_EDITOR);

					
				}, _DOT + CSS_TVT_COLGRID);
			});
		},

		/**
		* TimesheetMonthView
		*/
		syncElementsHeaderUI: function() {
			var instance = this;
			var timesheet = instance.get(TIMESHEET);
			var headerElements = instance.get('headerElements');

			instance.columnHeaderNode.all(DIV).each(
				function(columnNode, i) {
						columnNode.html(headerElements[i]);
				}
			);
		},

		/**
		* TimesheetMonthView
		*/
		syncGridUI: function() {
			var instance = this,
				intervalStartDate = instance._findCurrentIntervalStart(),
				startDateRef = DateMath.safeClearTime(intervalStartDate),
				rowStartDate = DateMath.safeClearTime(DateMath.findMonthStart(startDateRef)),
				rowEndDate = DateMath.safeClearTime(DateMath.findMonthEnd(startDateRef)),
				cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
				rowDataTableNode = instance.rowDataTableStack[cacheKey],
				timesheet = instance.get(TIMESHEET);

			if (!rowDataTableNode) {
				instance[TABLE_ROWS] = A.NodeList.create();
				instance[TABLE_GRID_NODE] = instance._valueTableGridNode();

				instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
						instance[TABLE_ROWS].push(
								instance.buildGridRowNode(celDate, index));
				});

				instance.rowDataTableStack[cacheKey] = instance[TABLE_ROWS];

				timesheet.fire('viewTimesheetDays');
			}
			else {
				instance[TABLE_ROWS] = rowDataTableNode;
			}

			instance[TABLE_ROW_CONTAINER].setHTML(instance[TABLE_ROWS]);
		},

		/**
		* TimesheetMonthView
		*/
		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[ROWS_CONTAINER_NODE].getDOM());

			instance.setStdModContent(
				WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
		},

		/**
		* TimesheetMonthView
		*/
		_buildTimesheetDay: function(timesheetDay, index) {
			var instance = this,
				timesheet = instance.get(TIMESHEET);

			if (timesheetDay) {
				var headerElements = instance.get('headerElements'),
					headerElementsCount = headerElements.length,
					i, cacheKey = String(timesheetDay.get('startTime')),
					timesheetDayRow = instance.timesheetDayRowStack[String(index)];

				var rowDateFormatter = instance.get('rowDateFormatter');
				var hourMinutesFormatter = instance.get('hourMinutesFormatter');

				for (i = 1; i < headerElementsCount; i++) {
					var timesheetDayNode = timesheetDayRow[String(i)],
						columnDataNode = A.Node.create(TPL_TIMESHEET_VIEW_COLUMN_DATA),
						startDate = timesheetDay.get('startDate');

					timesheetDayNode.set('data-startTime', (DateMath.toMidnight(DateMath.clone(startDate))).getTime());

					if (i == 1) {
						columnDataNode.append(rowDateFormatter.call(instance, startDate));
					}
					else if (i == 2) {
						columnDataNode.append(rowDateFormatter.call(instance, timesheetDay.get('endDate')));
					}
					else if (i == 3) {
						columnDataNode.append(String(timesheetDay.get('lunchTime') / 60000).concat(' min'));
					}
					else if (i == 4) {
						columnDataNode.append(hourMinutesFormatter.call(instance, new Date(timesheet.calculateAllTime(timesheetDay))));
					}
					else if (i == 5) {
						columnDataNode.append(hourMinutesFormatter.call(instance, new Date(timesheet.calculateWorkTime(timesheetDay))));
					}
					else if (i == 6) {
						columnDataNode.append(hourMinutesFormatter.call(instance, new Date(timesheet.calculateOverTime(timesheetDay))));
					}

					timesheetDayNode.append(columnDataNode);
				}
			}
		},

		/**
		* TimesheetMonthView
		*/
		_findCurrentIntervalEnd: function() {
			var instance = this,
				timesheet = instance.get(TIMESHEET),
				viewDate = timesheet.get(VIEW_DATE),
				displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.add(viewDate, DateMath.DAY, displayDaysInterval);
		},

		/**
		* TimesheetMonthView
		*/
		_findCurrentIntervalStart: function() {
			var instance = this,
				timesheet = instance.get(TIMESHEET),
				startDate = instance.get('today');

			if (timesheet) {
				startDate = timesheet.get(VIEW_DATE);
			}

			return startDate;
		},

		/**
		* TimesheetMonthView
		*/
		_getTableGridNode: function(celDate, index) {
			var instance = this,
				headerElements = instance.get('headerElements'),
				headerElementsCount = headerElements.length,
				tableGridNode = instance[TABLE_GRID_NODE].item(index),
				firstRowNode = tableGridNode.one(TR),
				i;

			var formatter = instance.get(HEADER_DATE_FORMATTER);

			instance.timesheetDayRowStack[String(index)] = {};

			for (i = 0; i < headerElementsCount; i++) {
				var columnNode = A.Node.create(TPL_TVT_GRID_COLUMN);
		 
				firstRowNode.append(columnNode);

				if (i === 0) {
					columnNode.addClass(CSS_TVT_COLGRID_FIRST);

					columnNode.append(formatter.call(instance, celDate));
				}

				if (DateMath.isToday(celDate)) {
					columnNode.addClass(CSS_TVT_ROW_TODAY);
				}

				if (!DateMath.isWeekDay(celDate)) {
					columnNode.addClass(CSS_TVT_ROW_WEEKEND);
				}

				instance.timesheetDayRowStack[String(index)][String(i)] = columnNode;
			}

			return tableGridNode;
		},

		/**
		* TimesheetMonthView
		*/
		_syncTimesheetDayNodeUI: function(timesheetDay, container, celDate) {
			var instance = this;
			var timesheet = instance.get(TIMESHEET);

			if (timesheetDay) {
				var timesheetDayNodeList = timesheetDay.get(NODE);
				var startDate = timesheetDay.get(START_DATE);

				var intervalStartDate = DateMath.toMidnight(instance._findCurrentIntervalStart());
			 
				var timesheetDayNode = timesheetDayNodeList.item();

				timesheetDayNode.appendTo(container);

				timesheetDay.syncUI();
			}
		},

		/**
		* TimesheetMonthView
		*/
		_uiSetDate: function(val) {
			var instance = this;

			instance.syncElementsHeaderUI();
			instance.syncGridUI();
		},

		/**
		* TimesheetMonthView
		*/
		_valueColumnHeaderNode: function() {
			var instance = this;

			var headerElements = instance.get('headerElements');
			var headerElementsCount = headerElements.length;

			return instance._valueNodeList(headerElementsCount, TPL_TVT_HEADER_ELEMENT);
		},

		/**
		* TimesheetMonthView
		*/
		_valueNodeList: function(size, tpl) {
			var instance = this;
			var buffer = [];

			while (size--) {
					buffer.push(tpl);
			}

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		},

		/**
		* TimesheetMonthView
		*/
		_valueTableGridNode: function() {
			var instance = this;

			var rowNumber = instance.getRowsNumber()

			return instance._valueNodeList(rowNumber, TPL_TVT_TABLE_GRID);
		}
	}
});

A.TimesheetMonthView = TimesheetMonthView;

var TimesheetDayRecorder = A.Component.create({
	NAME: 'timesheet-day-recorder',

	ATTRS: {
		selectedColumnName: {
			validator: isString,
			value: ''
		},

		selectedNode: {

		},

		bodyTemplate: {
			value: TPL_RECORDER_BODY_CONTENT
		},

		dateFormat: {
			validator: isString,
			value: '%a, %B %d'
		},

		timesheetDay: {},

		headerTemplate: {
			value: TPL_RECORDER_HEADER_CONTENT
		},

		popover: {
			setter: '_setPopover',
			validator: isObject,
			value: {}
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge({
					cancel: 'Cancel',
					description: 'Description',
					edit: 'Edit',
					endTime: 'End Time',
					lunchTime: 'Lunch Time',
					save: 'Save',
					startTime: 'Start Time'
					},
					val || {}
				);
			},
			validator: isObject
		}
	},

	EXTENDS: A.TimesheetDay,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.publish('cancel', {
                defaultFn: instance._defCancelEventFn
            });

            instance.publish('edit', {
                defaultFn: instance._defEditEventFn
            });

            instance.publish('save', {
                defaultFn: instance._defSaveEventFn
            });

			instance.popover = new A.Popover(instance.get('popover'));
			instance.popover.after('visibleChange', A.bind(instance._afterPopoverVisibleChange, instance));
		},

		getContentNode: function() {
            var instance = this;
            var popoverBB = instance.popover.get('boundingBox');

            return popoverBB.one('.' + CSS_TIMESHEET_DAY_RECORDER_CONTENT);
        },

		getTemplateData: function(fieldName) {
            var instance = this,
                strings = instance.get('strings'),
                timesheetDay = instance.get(TIMESHEET_DAY) || instance,
                content = timesheetDay.get('content'),
                endDate = timesheetDay.get('endDate'),
                endTime = '',
                startDate = timesheetDay.get('startDate')
                startTime = '';

            if (isUndefined(content)) {
                content = '';
            }

            if (!isUndefined(endDate)) {
                endTime = endDate.getTime();
            }

            if (!isUndefined(startDate)) {
               startTime = startDate.getTime();
            }

            return {
                content: content,
                date: new Date(),
                endDate: endDate,
                fieldName: strings[fieldName],
                startDate: startDate
            };
        },

        getUpdatedTimesheetDay: function(optAttrMap) {
            var instance = this;

            var timesheetDay = instance.get(TIMESHEET_DAY),
                formValues = instance.serializeForm(),
                timeValues = formValues.content.split(':'),
                selectedNode = instance.get('selectedNode'),
                fieldName = selectedNode.getData(FIELD_NAME),
                currentDate = selectedNode.getData('date'),
                rowIndex = selectedNode.getData('rowIndex'),
                workDate;

            if (!timesheetDay) {
                timesheetDay = instance.clone();

                timesheetDay.set('timesheet', instance.get(TIMESHEET), {
	                silent: true
	            });
            }

            timesheetDay.set('rowIndex', rowIndex);

            workDate = DateMath.add(currentDate, DateMath.HOUR, timeValues[0]);
            workDate = DateMath.add(workDate, DateMath.MINUTES, timeValues[1]);

            if (fieldName === START_TIME) {
            	timesheetDay.set(START_DATE, workDate);
            }
            else if (fieldName === END_TIME) {
            	timesheetDay.set(END_DATE, workDate);
            }
            else if (fieldName === LUNCH_TIME) {
            	timesheetDay.set(LUNCH_TIME, workDate.getTime() - currentDate.getTime());
            }

            return timesheetDay;
        },

		hidePopover: function() {
            var instance = this;

            instance.popover.hide();
        },

        populateForm: function() {
            var instance = this,
                bodyTemplate = instance.get('bodyTemplate'),
                headerTemplate = instance.get('headerTemplate'),
                templateData = instance.getTemplateData(instance.get('selectedColumnName'));

            instance.popover.setStdModContent('body', A.Lang.sub(bodyTemplate, templateData));
            instance.popover.setStdModContent('header', A.Lang.sub(headerTemplate, templateData));

            if (!instance.timepicker) {
            	instance.timepicker = new A.TimePicker({
	            mask: '%H:%M',
	            trigger: '#timesheedDayContent',
	            on: {
	                selectionChange: function(event) {
	                    
	                }
	            }
	        });
            }

            instance.popover.addToolbar(instance._getFooterToolbar(), 'footer');
        },

        serializeForm: function() {
            var instance = this;

            return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
        },

        showPopover: function(node) {
            var instance = this,
                timesheetDay = instance.get(TIMESHEET_DAY);

            if (!instance.popover.get('rendered')) {
                instance._renderPopover();
            }

            var align = instance.popover.get('align');
            instance.popover.set('align', {
            	node: node,
                points: align.points
            });

            instance.popover.show();
        },

        _afterPopoverVisibleChange: function(event) {
            var instance = this;

            var	popover = instance.popover,
				boundingBox = popover.get('boundingBox');

			boundingBox.addClass('timesheet-popover');

            if (event.newVal) {
                instance.populateForm();

                if (!instance.get('event')) {
                    var contentNode = instance.getContentNode();

                    if (contentNode) {
                        setTimeout(function() {
                            contentNode.selectText();
                        }, 0);
                    }
                }
            }
            else {
                instance.set(TIMESHEET_DAY, null, {
                    silent: true
                });
            }
        },

        _defCancelEventFn: function() {
            var instance = this;

            var selectedNode = instance.get('selectedNode');

            instance.hidePopover();

            if (selectedNode) {
		        selectedNode.removeClass('timesheet-selected-content');

		        instance.set('selectedNode', null);
		    } 
        },

        _defEditEventFn: function(event) {
            var instance = this;

            var timesheet = instance.get(TIMESHEET);

            timesheet.syncTimesheetDayUI(event.timesheetDay);

            instance._defCancelEventFn();
        },

        _defSaveEventFn: function(event) {
            var instance = this;

            var timesheet = instance.get(TIMESHEET);

            timesheet.addTimesheetDays(event.timesheetDay);

            timesheet.syncTimesheetDayUI(event.timesheetDay);

            instance._defCancelEventFn();
        },

		_getFooterToolbar: function() {
			var instance = this;

			var	timesheetDay = instance.get(TIMESHEET_DAY),
				strings = instance.get('strings'),
				children = [
					{
						label: strings.save,
						on: {
							click: A.bind(instance._handleSaveEvent, instance)
						}
					},
					{
						label: strings.cancel,
						on: {
							click: A.bind(instance._handleCancelEvent, instance)
						}
					}
				];

			return [children];
		},

		_handleCancelEvent: function(event) {
            var instance = this;

            instance.fire('cancel');

            if (event.domEvent) {
                event.domEvent.preventDefault();
            }

            event.preventDefault();
        },

		_handleSaveEvent: function(event) {
            var instance = this,
                eventName = instance.get(TIMESHEET_DAY) ? 'edit' : 'save',
                selectedNode = instance.get('selectedNode');

            instance.fire(eventName, {
                timesheetDay: instance.getUpdatedTimesheetDay(),
                currentDate: selectedNode.getData('date')
            });
           
            if (event.domEvent) {
                event.domEvent.preventDefault();
            }

            event.preventDefault();
        },

		_renderPopover: function() {
            var instance = this,
                timesheet = instance.get(TIMESHEET),
                timesheetBB = timesheet.get('boundingBox');

            instance.popover.render(timesheetBB);

            instance.formNode = A.Node.create(TPL_FORM);

           	//instance.formNode.on('submit', A.bind(instance._onSubmitForm, instance));
            //instance.popover.get('boundingBox').addClass(CSS_TIMESHEET_DAY);
            instance.popover.get('contentBox').wrap(instance.formNode);
        },

		_setPopover: function(val) {
			var instance = this;

			return A.merge({
				align: {
					points: [A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC]
				},
				bodyContent: TPL_RECORDER_BODY_CONTENT,
				constrain: true,
				headerContent: TPL_RECORDER_HEADER_CONTENT,
				preventOverlap: true,
				position: 'top',
				toolbars: {
					footer: instance._getFooterToolbar()
				},
				visible: false,
				zIndex: 500
			},
			val
			);
		}
	}
});

A.TimesheetDayRecorder = TimesheetDayRecorder;

}, '0.0.1', {
	"requires": ["aui-button", "aui-datatype", "aui-component", "aui-node-base", "aui-popover", "aui-timepicker", "aui-timepicker-native", "io-form", "model", "model-list", "querystring-parse", "widget-stdmod"], "skinnable": true
});