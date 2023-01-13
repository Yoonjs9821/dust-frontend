// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePieCanvas } from '@nivo/pie'

const data = [
    {
      "id": "java",
      "label": "java",
      "value": 15,
      "color": "hsl(251, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 35,
      "color": "hsl(30, 70%, 50%)"
    },
    {
        "id": "java",
        "label": "java",
        "value": 75,
        "color": "hsl(251, 70%, 50%)"
      },
      {
        "id": "css",
        "label": "css",
        "value": 100,
        "color": "hsl(30, 70%, 50%)"
      }
  ];

  // make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Graph = () => (
    <div style={{ height: "400px" }}>
    <ResponsivePieCanvas
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'paired' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        enableArcLabels={false}
        arcLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: '좋음'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '보통'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '나쁨'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '매우나쁨'
                },
                id: 'dots'
            }
        ]}
    />
    </div>
)

export default Graph;