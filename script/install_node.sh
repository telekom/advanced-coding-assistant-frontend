#!/bin/bash

# Define the version of Node.js you want to install
NODE_VERSION="22.x"


# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo "curl could not be found, attempting to install..."

    # Try to determine the platform
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        case $ID in
            ubuntu|debian|raspbian)
                su -c "apt-get update && apt-get install -y sudo"
                sudo apt-get update
                sudo apt-get install -y curl
                ;;
            centos|fedora|rhel)
                su -c "yum install -y sudo"
                sudo yum install -y curl
                ;;
            arch|manjaro)
                su -c "pacman -Sy sudo"
                sudo pacman -Syu curl
                ;;
            *)
                echo "Unsupported distribution: $ID"
                echo "Please install curl manually."
                exit 1
                ;;
        esac
    else
        echo "Cannot determine the OS distribution, please install curl manually."
        exit 1
    fi
fi


# Check if Node.js and npm are installed
if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    echo "Node.js and npm are already installed."
else
    echo "Node.js and npm not found. Installing them now..."

    # Detect the package manager and install Node.js
    if command -v apt-get >/dev/null 2>&1; then
        # For Debian and Ubuntu based distributions
        curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v yum >/dev/null 2>&1; then
        # For RHEL and CentOS based distributions
        curl -sL https://rpm.nodesource.com/setup_$NODE_VERSION | sudo bash -
        sudo yum install -y nodejs
    elif command -v brew >/dev/null 2>&1; then
        # For macOS with Homebrew
        brew install node
    else
        echo "Unsupported package manager. Please install Node.js manually."
        exit 1
    fi
fi

# Check if Node.js and npm are successfully installed after the script runs
if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    echo "Installation successful. Node.js and npm are installed."
else
    echo "Installation failed. Please install Node.js and npm manually."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node > /dev/null 2>&1; then
    echo "Node.js is not installed. Please install it before continuing."
    exit 1
fi
