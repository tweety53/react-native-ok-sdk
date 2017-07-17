require "json"
package = JSON.parse(File.read(File.join(__dir__, '../', 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package["version"]
  s.summary       = package['description']
  s.requires_arc  = true
  s.license       = package["license"]
  s.homepage      = package["homepage"]
  s.author        = { 'Alex Belets' => 'askii.robotics@gmail.com' }
  s.source        = { :git => 'https://github.com/askiiRobotics/react-native-ok-sdk.git', :tag => s.version.to_s }

  s.source_files  = 'ios/*.{h,m}'

  s.platform      = :ios, '7.0'

  s.dependency 'React'
  
  s.subspec 'ok-ios-sdk' do |ss|
    ss.dependency     'ok-ios-sdk'
    ss.source_files = '*.{h,m}'
  end
end