sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"FC_CA_V2_0_1/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("FC_CA_V2_0_1.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var that = this;
			// call the base component's init function
			UIComponent.prototype.init.apply(that, arguments);
			that.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			var oModel = new sap.ui.model.odata.ODataModel("/S4hana/fc/xs/services.xsodata/");
			oModel.attachRequestFailed(function(oEvent) {
				that.onSessionFail(oEvent);
			});
		},
		onSessionFail: function(oEvent) {
			if (oEvent.getParameters().response.statusCode === 503) {
				sap.m.MessageBox.confirm("Session is gone. Refresh?", {
					onClose: function(oEvt) {
						if (oEvt === sap.m.MessageBox.Action.OK) {
							document.location.reload(true);
						}
					}
				});
			}

		}
	});
});