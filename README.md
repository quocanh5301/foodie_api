ipconfig getifaddr en0 

lsof -i tcp:3000
kill -9 <PID>

flutter pub run build_runner build --delete-conflicting-outputs
OR
dart run build_runner build --delete-conflicting-outputs
