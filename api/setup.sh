ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text3
cd ~
git clone https://github.com/<%= login %>/<%= repoName %>.git
cd <%= repoName %>
subl .
git checkout -b <%= branchName %>
touch test-file.txt 
git add . && git commit -m "Create my first text file" && git push -u origin <%= branchName %>
