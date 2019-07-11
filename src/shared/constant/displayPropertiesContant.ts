export const DEFAULT_SETTING = {
    display_properties: {
        essentials: {
            IAM: {
                tables: {
                    'users-table': [
                        {
                            key: 'username',
                            name: 'User Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'groups',
                            name: 'Groups',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'consoleAccess',
                            name: 'Console Access',
                            sortable: false,
                            display: false,
                        },
                        {
                            key: 'apiAccess',
                            name: 'API Access',
                            sortable: false,
                            display: false,
                        }
                    ],
                    'groups-table': [
                        {
                            key: 'name',
                            name: 'Group Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'users',
                            name: 'Users',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'attachedPolicies',
                            name: 'Inline Policies',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'creationTime',
                            name: 'Creation Time',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'policies-table': [
                        {
                            key: 'policyname',
                            name: 'Policy Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'type',
                            name: 'Type',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'usedAs',
                            name: 'Used as',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'creationTime',
                            name: 'Creation Time',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'editedTime',
                            name: 'Edited time',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'description',
                            name: 'Description',
                            sortable: false,
                            display: true,
                        }
                    ]
                }
            },
            cognito: {
                tables: {
                    'users-table': [
                        {
                            key: 'username',
                            name: 'User Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'pools',
                            name: 'Pools',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'consoleAccess',
                            name: 'Console Access',
                            sortable: false,
                            display: false,
                        },
                        {
                            key: 'dashboardAccess',
                            name: 'Dashboard Access',
                            sortable: false,
                            display: false,
                        }
                    ],
                    'pools-table': [
                        {
                            key: 'poolname',
                            name: 'Pool Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'users',
                            name: 'Users',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'attachedPolicies',
                            name: 'Inline Policies',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'creationTime',
                            name: 'Creation Time',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'credentials-table': [
                        {
                            key: 'accessKeyId',
                            name: 'Access Key ID',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'secretAccessKey',
                            name: 'Secret Access Key',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'apps-table': [
                        {
                            key: 'applicationname',
                            name: 'Application Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'creationTime',
                            name: 'Creation Time',
                            sortable: false,
                            display: true,
                        }
                    ]
                }
            },
            comms: {
                tables: {
                    'campaigns-table': [
                        {
                            key: 'ownerId',
                            name: 'Owner Id',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'ownerType',
                            name: 'Owner Type',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'name',
                            name: 'Name',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'events',
                            name: 'Events',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'templates',
                            name: 'Templates',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'createdAt',
                            name: 'Created At',
                            sortable: false,
                            display: false,
                        },
                        {
                            key: 'updatedAt',
                            name: 'Updated At',
                            sortable: false,
                            display: false,
                        }
                    ],
                    'events-table': [
                        {
                            key: 'name',
                            name: 'Event Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'channel',
                            name: 'Channel',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'urn',
                            name: 'URN',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'status',
                            name: 'Status',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'createdAt',
                            name: 'Created At',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'updatedAt',
                            name: 'Updated At',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'messages-table': [
                        {
                            key: 'name',
                            name: 'Name',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'channel',
                            name: 'Channel',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'from',
                            name: 'From',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'providers-table': [
                        {
                            key: 'providername',
                            name: 'Provider Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'events',
                            name: 'Events',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'encryptedSecret',
                            name: 'Encrypted Secret',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'encryptedSecretIv',
                            name: 'Encrypted Secret IV',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'key',
                            name: 'Key',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'createdAt',
                            name: 'Created At',
                            sortable: false,
                            display: true,
                        }
                    ],
                    'templates-table': [
                        {
                            key: 'content',
                            name: 'Content',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'campaigns',
                            name: 'Campaigns',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'templatesname',
                            name: 'Templates Name',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'status',
                            name: 'Status',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'createdAt',
                            name: 'Created At',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'updatedAt',
                            name: 'Updated At',
                            sortable: false,
                            display: true,
                        }
                    ]
                }
            },
            storage: {
                tables: {
                    'files-table': [
                        {
                            key: 'name',
                            name: 'Name',
                            sortable: true,
                            display: true,
                        },
                        {
                            key: 'createdAt',
                            name: 'Created At',
                            sortable: false,
                            display: true,
                        },
                        {
                            key: 'updatedAt',
                            name: 'Updated At',
                            sortable: false,
                            display: true,
                        }
                    ]
                }
            }
        }
    }
}