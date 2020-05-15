import os
import shutil
import json
import sys
from datetime import datetime

import NRLWrap


def copy_folders(src, dst):
    for dir in os.listdir(src):
        if os.path.isdir(src + dir):
            shutil.copytree(src + dir, dst + dir)


def custom_bar(current, total, width=80):
    print("Downloading: %d%% [%d / %d] bytes" % (current / total * 100, current, total))


def retrieve_config_value(search_keys):
    with open(os.path.join("./cfg", "configuration.json"),
              "r") as config_file:
        config = json.load(config_file)
        temp_config = config
        for key in search_keys:
            try:
                temp_config = temp_config[key]
            except Exception:
                raise Exception("key not found")
    return temp_config


def update_nrl_structure():
    """

    """
    NRLWrap.update_local_library()
