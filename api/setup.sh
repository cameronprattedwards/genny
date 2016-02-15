ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text3
cd ~
git clone https://github.com/<%= login %>/<%= repoName %>.git
cd <%= repoName %>

EMAIL=`git config user.email`
USERNAME=`git config user.name`

if [ "$EMAIL" = '' ]; then
    echo "setting git email"
    git config user.email '<%= email %>'
fi

if [ "$USERNAME" = '' ]; then
	echo "setting git username"
	git config user.name '<%= login %>'
fi

git checkout -b <%= branchName %>
echo "\n" >> test-file.txt

git add . && git commit -m "Create my first text file" && git push -u origin <%= branchName %>
subl .
