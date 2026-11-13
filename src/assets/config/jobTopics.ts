
export type JobIcon = 'network' | 'pole' | 'home' | 'route' | 'box' | 'building' | 'wifi' | 'check'

export type JobChapter = {
    id: string
    title: string
    description: string
    icon: JobIcon
    steps: readonly string[]
}

export type JobPageContent = {
    title: string
    subtitle: string
    path: readonly string[]
    chapters: readonly JobChapter[]
}

export const jobTopics: Record<'distribution' | 'outside' | 'inside', JobPageContent> = {
    distribution: {
        title: 'FDH & Distribution',
        subtitle: 'Find the assigned path before connecting anything.',
        path: ['FDH', 'Assigned port', 'Terminal', 'Customer'],
        chapters: [
            { id: 'fdh', title: 'FDH Assignments', description: 'Identify, verify, and trace the assigned fiber.', icon: 'network', steps: ['Check work order', 'Locate cabinet', 'Verify labels', 'Confirm assignment'] },
            { id: 'calix', title: 'Calix Equipment', description: 'Identify the equipment and its role.', icon: 'box', steps: ['Identify model', 'Check documentation', 'Verify connections'] },
            { id: 'mdu', title: 'Apartments / MDU', description: 'Trace shared building distribution.', icon: 'building', steps: ['Find building entry', 'Locate distribution', 'Confirm unit assignment'] },
        ],
    },
    outside: {
        title: 'Outside Installation',
        subtitle: 'Follow the drop from the terminal to the home.',
        path: ['Terminal', 'Drop route', 'Slack box', 'Entry'],
        chapters: [
            { id: 'aerial', title: 'Aerial Drop', description: 'Pole to house, including attachment and slack.', icon: 'pole', steps: ['Inspect route', 'Verify attachment points', 'Route drop', 'Store slack', 'Verify work'] },
            { id: 'buried', title: 'Buried Drop', description: 'Underground route, protection, and restoration.', icon: 'route', steps: ['Confirm utility markings', 'Sketch route', 'Install per approved method', 'Protect entry', 'Document'] },
            { id: 'slack', title: 'Slack Box & House Entry', description: 'Outside termination and entry protection.', icon: 'box', steps: ['Choose approved location', 'Secure enclosure', 'Route fiber', 'Seal entry', 'Inspect'] },
            { id: 'sketches', title: 'Sketches & Documentation', description: 'Route sketches, measurements, and job photos.', icon: 'check', steps: ['Mark endpoints', 'Draw route', 'Record measurements', 'Photograph', 'Submit'] },
        ],
    },
    inside: {
        title: 'Inside Installation',
        subtitle: 'Connect, activate, and verify service.',
        path: ['Entry', 'ONT / SmartNID', 'Gateway', 'Devices'],
        chapters: [
            { id: 'ont', title: 'ONT & Activation', description: 'Identify optical equipment and verify service.', icon: 'box', steps: ['Mount equipment', 'Connect fiber', 'Check status', 'Follow activation process'] },
            { id: 'gateway', title: 'Gateway & Ethernet', description: 'Connect the home network.', icon: 'network', steps: ['Connect gateway', 'Verify Ethernet', 'Test wired service'] },
            { id: 'wifi', title: 'Wi-Fi Verification', description: 'Check coverage and customer connectivity.', icon: 'wifi', steps: ['Confirm Wi-Fi', 'Test coverage', 'Verify customer devices'] },
        ],
    },
}
