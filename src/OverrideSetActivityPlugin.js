import { FlexPlugin } from 'flex-plugin';
import React from 'react';

const PLUGIN_NAME = 'OverrideSetActivityPlugin';

export default class OverrideSetActivityPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    const worker = manager.workerClient;
    const baseUrl = `https://${manager.serviceConfiguration.runtime_domain}`;
    const setWorkerActivityUrl = `${baseUrl}/set-worker-activity`;
    const offlineActivitySid = manager.serviceConfiguration.taskrouter_offline_activity_sid;
    
    flex.Actions.replaceAction('SetActivity', (payload, original) => {
      if (payload.activitySid === offlineActivitySid) {
        fetch(setWorkerActivityUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            workerSid: worker.sid,
            activitySid: offlineActivitySid,
            rejectPendingReservations: true
          })
        }).then(response => {
          console.log('Activity set response:', response);
        }).catch(err => {
          console.error('Activity set failed with error:', err);
        })
      } else {
        original(payload);
      }
    })
  }
}
