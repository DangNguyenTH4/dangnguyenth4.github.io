# Mindful Bell

A simple mindfulness reminder that plays a bell sound and shows a notification every 15 minutes to help you stay present and mindful throughout your day.

## Prerequisites

The script requires the following packages:
- `libnotify-bin` (for notifications)
- `pulseaudio-utils` (for playing sound)

Install them using:
```bash
sudo apt-get install libnotify-bin pulseaudio-utils
```

## Installation

1. Clone this repository or download the files:
   - `mindful_bell.sh`
   - `bell-transition-1-305458.wav`

2. Make the script executable:
```bash
chmod +x mindful_bell.sh
```

## Usage

### Running in background

To run the mindful bell in the background:

```bash
nohup ./mindful_bell.sh &
```

The script will:
- Show a notification "🌿 Tỉnh thức" (Mindfulness) every 15 minutes
- Play a bell sound
- Continue running in the background even if you close the terminal

### Customization

You can modify the script to change:
- Sound file: Edit the `SOUND` variable in the script
- Interval: Edit the `INTERVAL` variable (default is 900 seconds = 15 minutes)

### Stopping the process

To stop the mindful bell:

1. Find the process ID:
```bash
ps aux | grep mindful_bell.sh
```

2. Kill the process:
```bash
kill [process_id]
```

Replace `[process_id]` with the actual process ID from step 1.


