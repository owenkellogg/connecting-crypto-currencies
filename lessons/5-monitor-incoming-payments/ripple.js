process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const RippleAccountMonitor = require('ripple-account-monitor');

const monitor = new RippleAccountMonitor({
  rippleRestUrl: 'https://api.ripple.com/',
  account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
  onTransaction: function(transaction, next) {
    console.log('new transaction', transaction);
    next();
  },
  onError: function(error) {
    console.log('RippleAccountMonitor::Error', error);
  }
});

monitor.lastHash = '82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9';

monitor.start();
