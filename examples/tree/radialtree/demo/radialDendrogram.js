import G6 from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then(res => res.json())
  .then(data => {
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      pixelRatio: 2,
      linkCenter: true,
      modes: {
        default: [{
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
          }
        }, 'drag-canvas', 'zoom-canvas' ]
      },
      defaultNode: {
        size: 26,
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        }
      },
      defaultEdge: {
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        nodeSep: 20,
        rankSep: 100,
        radial: true
      }
    });

    graph.node(function(node) {
      return {
        label: node.id
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  });
